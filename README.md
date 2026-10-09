# EV Charging Network Management and Optimization

A professional DBMS academic prototype built around an 8-entity MySQL relational database.

## Technology
- Frontend: HTML, CSS, vanilla JavaScript
- Backend: Node.js + Express
- Database: MySQL
- Driver: mysql2

## 8 database entities
1. Users
2. Vehicle
3. Charging_Station
4. Charging_Point
5. Charging_Session
6. Reservation
7. Payment
8. Maintenance

## Run with MySQL
1. Create the database and tables:
   - Open MySQL Workbench or MySQL CLI.
   - Run `database/schema.sql`.
   - Run `database/seed.sql`.
2. Copy `.env.example` to `.env` and enter your MySQL credentials.
3. Run:
   ```bash
   npm install
   npm start
   ```
4. Open `http://localhost:3000`.

## Demo mode
If MySQL is unavailable, the UI automatically uses the supplied academic demo dataset so the interface can still be demonstrated. The top-right database indicator shows whether the API is connected.

## DBMS concepts demonstrated
- Primary keys and foreign keys
- Referential integrity
- 1:N and 1:1 relationships
- INSERT through reservation creation
- SELECT
- Multi-table JOINs
- WHERE filters
- GROUP BY
- COUNT
- SUM
- ORDER BY
- SQL-driven dashboard/analytics

## Project structure
- `server.js` — Express API and MySQL queries
- `database/schema.sql` — normalized schema with constraints
- `database/seed.sql` — sample records
- `public/index.html` — application shell
- `public/styles.css` — academic dashboard styling
- `public/app.js` — frontend state, rendering and API calls

## Roles
The prototype includes a role switcher:
- **Administrator**: network overview, stations/points, reservations, payments, maintenance, analytics and database information.
- **EV User**: stations/points, reservations, personal charging history and payments.

The role switcher is a presentation/demo control. Authentication/authorization is intentionally outside the DBMS scope. All data changes are designed to be performed through database-backed API operations.
