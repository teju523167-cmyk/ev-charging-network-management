const express = require('express');
const path = require('path');
const mysql = require('mysql2/promise');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'ev_charging_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

async function dbQuery(sql, params = []) {
  const [rows] = await pool.query(sql, params);
  return rows;
}

app.get('/api/health', async (_req, res) => {
  try {
    await dbQuery('SELECT 1 AS ok');
    res.json({ connected: true, database: process.env.DB_NAME || 'ev_charging_db' });
  } catch (e) {
    res.json({ connected: false, database: process.env.DB_NAME || 'ev_charging_db', message: e.message });
  }
});

app.get('/api/dashboard', async (_req, res) => {
  try {
    const [cards, recent, reservations, maintenance, points] = await Promise.all([
      dbQuery(`
        SELECT
          (SELECT COUNT(*) FROM Charging_Station) AS stations,
          (SELECT COUNT(*) FROM Charging_Point) AS points,
          (SELECT COUNT(*) FROM Charging_Point WHERE Status='Available') AS available,
          (SELECT COUNT(*) FROM Charging_Point WHERE Status='Occupied') AS occupied,
          (SELECT COALESCE(SUM(Energy_Consumed),0) FROM Charging_Session) AS energy,
          (SELECT COALESCE(SUM(Amount),0) FROM Payment WHERE Payment_Status='Successful') AS revenue
      `),
      dbQuery(`
        SELECT cs.Session_ID, u.Name, v.Registration_No, s.Station_Name,
               cs.Start_Time, cs.End_Time, cs.Energy_Consumed
        FROM Charging_Session cs
        JOIN Vehicle v ON v.Vehicle_ID=cs.Vehicle_ID
        JOIN Users u ON u.User_ID=v.User_ID
        JOIN Charging_Point cp ON cp.Point_ID=cs.Point_ID
        JOIN Charging_Station s ON s.Station_ID=cp.Station_ID
        ORDER BY cs.Start_Time DESC LIMIT 6
      `),
      dbQuery(`
        SELECT r.Reservation_ID, u.Name, s.Station_Name, cp.Point_ID,
               r.Reservation_Date, r.Start_Time, r.End_Time, r.Status
        FROM Reservation r
        JOIN Users u ON u.User_ID=r.User_ID
        JOIN Charging_Point cp ON cp.Point_ID=r.Point_ID
        JOIN Charging_Station s ON s.Station_ID=cp.Station_ID
        WHERE r.Status <> 'Cancelled'
        ORDER BY r.Reservation_Date, r.Start_Time LIMIT 6
      `),
      dbQuery(`
        SELECT m.Maintenance_ID, s.Station_Name, m.Maintenance_Date,
               m.Maintenance_Type, m.Status
        FROM Maintenance m
        JOIN Charging_Station s ON s.Station_ID=m.Station_ID
        WHERE m.Status <> 'Completed'
        ORDER BY m.Maintenance_Date LIMIT 6
      `),
      dbQuery(`
        SELECT cp.Point_ID, s.Station_Name, cp.Connector_Type,
               cp.Power_Rating, cp.Status
        FROM Charging_Point cp
        JOIN Charging_Station s ON s.Station_ID=cp.Station_ID
        ORDER BY cp.Point_ID
      `)
    ]);
    res.json({ cards: cards[0], recent, reservations, maintenance, points });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/api/stations', async (_req, res) => {
  try {
    const rows = await dbQuery(`
      SELECT s.Station_ID, s.Station_Name, s.Location,
             COUNT(cp.Point_ID) AS Total_Points,
             SUM(cp.Status='Available') AS Available_Points
      FROM Charging_Station s
      LEFT JOIN Charging_Point cp ON cp.Station_ID=s.Station_ID
      GROUP BY s.Station_ID, s.Station_Name, s.Location
      ORDER BY s.Station_ID
    `);
    res.json(rows);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.get('/api/points', async (req, res) => {
  try {
    const conditions = [];
    const params = [];
    if (req.query.station) { conditions.push('cp.Station_ID=?'); params.push(req.query.station); }
    if (req.query.connector) { conditions.push('cp.Connector_Type=?'); params.push(req.query.connector); }
    if (req.query.status) { conditions.push('cp.Status=?'); params.push(req.query.status); }
    const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
    const rows = await dbQuery(`
      SELECT cp.Point_ID, cp.Station_ID, s.Station_Name, cp.Connector_Type,
             cp.Power_Rating, cp.Status
      FROM Charging_Point cp
      JOIN Charging_Station s ON s.Station_ID=cp.Station_ID
      ${where}
      ORDER BY cp.Point_ID
    `, params);
    res.json(rows);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.get('/api/users', async (_req, res) => {
  try { res.json(await dbQuery('SELECT User_ID, Name, Email FROM Users ORDER BY Name')); }
  catch (e) { res.status(500).json({ error: e.message }); }
});

app.get('/api/reservations', async (_req, res) => {
  try {
    res.json(await dbQuery(`
      SELECT r.Reservation_ID, r.User_ID, u.Name, r.Point_ID, cp.Station_ID,
             s.Station_Name, r.Reservation_Date, r.Start_Time, r.End_Time, r.Status
      FROM Reservation r
      JOIN Users u ON u.User_ID=r.User_ID
      JOIN Charging_Point cp ON cp.Point_ID=r.Point_ID
      JOIN Charging_Station s ON s.Station_ID=cp.Station_ID
      ORDER BY r.Reservation_Date DESC, r.Start_Time DESC
    `));
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.post('/api/reservations', async (req, res) => {
  const { userId, pointId, date, startTime, endTime, status = 'Confirmed' } = req.body;
  if (!userId || !pointId || !date || !startTime || !endTime)
    return res.status(400).json({ error: 'User, charging point, date, start time and end time are required.' });
  if (endTime <= startTime)
    return res.status(400).json({ error: 'End time must be later than start time.' });

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    const [pointRows] = await conn.query('SELECT Status FROM Charging_Point WHERE Point_ID=? FOR UPDATE', [pointId]);
    if (!pointRows.length) throw new Error('Selected charging point does not exist.');
    const [overlap] = await conn.query(`
      SELECT Reservation_ID FROM Reservation
      WHERE Point_ID=? AND Reservation_Date=? AND Status <> 'Cancelled'
        AND Start_Time < ? AND End_Time > ?
      LIMIT 1
    `, [pointId, date, endTime, startTime]);
    if (overlap.length) throw new Error('This charging point is already reserved for an overlapping time.');
    const [result] = await conn.query(`
      INSERT INTO Reservation (User_ID, Point_ID, Reservation_Date, Start_Time, End_Time, Status)
      VALUES (?,?,?,?,?,?)
    `, [userId, pointId, date, startTime, endTime, status]);
    await conn.commit();
    res.status(201).json({ Reservation_ID: result.insertId, message: 'Reservation created successfully.' });
  } catch (e) {
    await conn.rollback();
    res.status(400).json({ error: e.message });
  } finally { conn.release(); }
});

app.get('/api/history', async (req, res) => {
  try {
    const params = [];
    let where = '';
    if (req.query.userId) { where = 'WHERE u.User_ID=?'; params.push(req.query.userId); }
    res.json(await dbQuery(`
      SELECT u.User_ID, u.Name, v.Registration_No, v.Model,
             cs.Session_ID, s.Station_Name, cp.Point_ID,
             cs.Start_Time, cs.End_Time, cs.Energy_Consumed
      FROM Users u
      JOIN Vehicle v ON v.User_ID=u.User_ID
      JOIN Charging_Session cs ON cs.Vehicle_ID=v.Vehicle_ID
      JOIN Charging_Point cp ON cp.Point_ID=cs.Point_ID
      JOIN Charging_Station s ON s.Station_ID=cp.Station_ID
      ${where}
      ORDER BY cs.Start_Time DESC
    `, params));
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.get('/api/payments', async (_req, res) => {
  try {
    res.json(await dbQuery(`
      SELECT p.Payment_ID, p.Session_ID, p.Amount, p.Payment_Date,
             p.Payment_Method, p.Payment_Status, u.Name
      FROM Payment p
      JOIN Charging_Session cs ON cs.Session_ID=p.Session_ID
      JOIN Vehicle v ON v.Vehicle_ID=cs.Vehicle_ID
      JOIN Users u ON u.User_ID=v.User_ID
      ORDER BY p.Payment_Date DESC
    `));
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.get('/api/maintenance', async (req, res) => {
  try {
    const params = [], conditions = [];
    if (req.query.station) { conditions.push('m.Station_ID=?'); params.push(req.query.station); }
    if (req.query.status) { conditions.push('m.Status=?'); params.push(req.query.status); }
    const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
    res.json(await dbQuery(`
      SELECT m.Maintenance_ID, m.Station_ID, s.Station_Name,
             m.Maintenance_Date, m.Maintenance_Type, m.Status
      FROM Maintenance m
      JOIN Charging_Station s ON s.Station_ID=m.Station_ID
      ${where}
      ORDER BY m.Maintenance_Date DESC
    `, params));
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.get('/api/analytics', async (_req, res) => {
  try {
    const [utilization, energy, revenue, availability, maintenance] = await Promise.all([
      dbQuery(`
        SELECT s.Station_ID, s.Station_Name, COUNT(cs.Session_ID) AS Sessions
        FROM Charging_Station s
        LEFT JOIN Charging_Point cp ON cp.Station_ID=s.Station_ID
        LEFT JOIN Charging_Session cs ON cs.Point_ID=cp.Point_ID
        GROUP BY s.Station_ID, s.Station_Name ORDER BY Sessions DESC
      `),
      dbQuery(`
        SELECT s.Station_ID, s.Station_Name, COALESCE(SUM(cs.Energy_Consumed),0) AS Energy_kWh
        FROM Charging_Station s
        LEFT JOIN Charging_Point cp ON cp.Station_ID=s.Station_ID
        LEFT JOIN Charging_Session cs ON cs.Point_ID=cp.Point_ID
        GROUP BY s.Station_ID, s.Station_Name ORDER BY Energy_kWh DESC
      `),
      dbQuery(`
        SELECT s.Station_ID, s.Station_Name, COALESCE(SUM(CASE WHEN p.Payment_Status='Successful' THEN p.Amount ELSE 0 END),0) AS Revenue
        FROM Charging_Station s
        LEFT JOIN Charging_Point cp ON cp.Station_ID=s.Station_ID
        LEFT JOIN Charging_Session cs ON cs.Point_ID=cp.Point_ID
        LEFT JOIN Payment p ON p.Session_ID=cs.Session_ID
        GROUP BY s.Station_ID, s.Station_Name ORDER BY Revenue DESC
      `),
      dbQuery(`SELECT Status, COUNT(*) AS Count FROM Charging_Point GROUP BY Status ORDER BY Status`),
      dbQuery(`
        SELECT Status, COUNT(*) AS Count
        FROM Maintenance
        GROUP BY Status ORDER BY Status
      `)
    ]);
    res.json({ utilization, energy, revenue, availability, maintenance });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.get('*', (_req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));

app.listen(PORT, () => console.log(`EV DBMS app running at http://localhost:${PORT}`));
