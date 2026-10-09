const state = {
  page: 'dashboard',
  connected: false,
  stations: [], points: [], users: [], reservations: [], history: [], payments: [], maintenance: [], analytics: null, dashboard: null
};

const demo = {
  stations: [
    {Station_ID:1,Station_Name:'VNR VJIET Station',Location:'Bachupally, Hyderabad',Total_Points:2,Available_Points:1},
    {Station_ID:2,Station_Name:'HITEC City Station',Location:'Madhapur, Hyderabad',Total_Points:2,Available_Points:1},
    {Station_ID:3,Station_Name:'Financial District Station',Location:'Nanakramguda, Hyderabad',Total_Points:2,Available_Points:2},
    {Station_ID:4,Station_Name:'RC Puram Station',Location:'Ramachandra Puram, Hyderabad',Total_Points:2,Available_Points:1}
  ],
  points: [
    {Point_ID:1,Station_ID:1,Station_Name:'VNR VJIET Station',Connector_Type:'CCS2',Power_Rating:60,Status:'Available'},
    {Point_ID:2,Station_ID:1,Station_Name:'VNR VJIET Station',Connector_Type:'Type 2',Power_Rating:22,Status:'Occupied'},
    {Point_ID:3,Station_ID:2,Station_Name:'HITEC City Station',Connector_Type:'CCS2',Power_Rating:120,Status:'Available'},
    {Point_ID:4,Station_ID:2,Station_Name:'HITEC City Station',Connector_Type:'CHAdeMO',Power_Rating:50,Status:'Maintenance'},
    {Point_ID:5,Station_ID:3,Station_Name:'Financial District Station',Connector_Type:'CCS2',Power_Rating:150,Status:'Available'},
    {Point_ID:6,Station_ID:3,Station_Name:'Financial District Station',Connector_Type:'Type 2',Power_Rating:22,Status:'Available'},
    {Point_ID:7,Station_ID:4,Station_Name:'RC Puram Station',Connector_Type:'CCS2',Power_Rating:60,Status:'Occupied'},
    {Point_ID:8,Station_ID:4,Station_Name:'RC Puram Station',Connector_Type:'Type 2',Power_Rating:22,Status:'Available'}
  ],
  users: [{User_ID:1,Name:'Ananya Rao',Email:'ananya.rao@example.com'},{User_ID:2,Name:'Rahul Mehta',Email:'rahul.mehta@example.com'},{User_ID:3,Name:'Sneha Iyer',Email:'sneha.iyer@example.com'},{User_ID:4,Name:'Arjun Kumar',Email:'arjun.kumar@example.com'}],
  history: [
    {User_ID:1,Name:'Ananya Rao',Registration_No:'TS09EV1001',Session_ID:1,Station_Name:'VNR VJIET Station',Point_ID:2,Start_Time:'2026-10-07 09:15',End_Time:'2026-10-07 10:42',Energy_Consumed:28.4},
    {User_ID:2,Name:'Rahul Mehta',Registration_No:'TS08EV2042',Session_ID:2,Station_Name:'HITEC City Station',Point_ID:3,Start_Time:'2026-10-07 12:05',End_Time:'2026-10-07 12:51',Energy_Consumed:36.7},
    {User_ID:3,Name:'Sneha Iyer',Registration_No:'TS10EV7788',Session_ID:3,Station_Name:'Financial District Station',Point_ID:5,Start_Time:'2026-10-06 18:20',End_Time:'2026-10-06 19:12',Energy_Consumed:42.1},
    {User_ID:4,Name:'Arjun Kumar',Registration_No:'TS07EV5512',Session_ID:4,Station_Name:'RC Puram Station',Point_ID:7,Start_Time:'2026-10-08 07:45',End_Time:null,Energy_Consumed:18.6},
    {User_ID:1,Name:'Ananya Rao',Registration_No:'TS09EV1001',Session_ID:5,Station_Name:'VNR VJIET Station',Point_ID:1,Start_Time:'2026-10-05 15:10',End_Time:'2026-10-05 16:02',Energy_Consumed:24.3},
    {User_ID:2,Name:'Rahul Mehta',Registration_No:'TS08EV2042',Session_ID:6,Station_Name:'Financial District Station',Point_ID:6,Start_Time:'2026-10-04 11:25',End_Time:'2026-10-04 12:18',Energy_Consumed:31.9}
  ],
  reservations: [
    {Reservation_ID:1,User_ID:1,Name:'Ananya Rao',Point_ID:1,Station_Name:'VNR VJIET Station',Reservation_Date:'2026-10-08',Start_Time:'14:00',End_Time:'15:00',Status:'Confirmed'},
    {Reservation_ID:2,User_ID:2,Name:'Rahul Mehta',Point_ID:3,Station_Name:'HITEC City Station',Reservation_Date:'2026-10-08',Start_Time:'16:30',End_Time:'17:30',Status:'Pending'},
    {Reservation_ID:3,User_ID:3,Name:'Sneha Iyer',Point_ID:6,Station_Name:'Financial District Station',Reservation_Date:'2026-10-09',Start_Time:'09:00',End_Time:'10:00',Status:'Confirmed'},
    {Reservation_ID:4,User_ID:4,Name:'Arjun Kumar',Point_ID:8,Station_Name:'RC Puram Station',Reservation_Date:'2026-10-09',Start_Time:'11:30',End_Time:'12:30',Status:'Confirmed'}
  ],
  payments: [
    {Payment_ID:1,Session_ID:1,Name:'Ananya Rao',Amount:312.4,Payment_Date:'2026-10-07 10:50',Payment_Method:'UPI',Payment_Status:'Successful'},
    {Payment_ID:2,Session_ID:2,Name:'Rahul Mehta',Amount:403.7,Payment_Date:'2026-10-07 12:58',Payment_Method:'Card',Payment_Status:'Successful'},
    {Payment_ID:3,Session_ID:3,Name:'Sneha Iyer',Amount:463.1,Payment_Date:'2026-10-06 19:20',Payment_Method:'UPI',Payment_Status:'Successful'},
    {Payment_ID:4,Session_ID:4,Name:'Arjun Kumar',Amount:204.6,Payment_Date:'2026-10-08 08:10',Payment_Method:'Wallet',Payment_Status:'Pending'},
    {Payment_ID:5,Session_ID:5,Name:'Ananya Rao',Amount:267.3,Payment_Date:'2026-10-05 16:10',Payment_Method:'Card',Payment_Status:'Successful'},
    {Payment_ID:6,Session_ID:6,Name:'Rahul Mehta',Amount:350.9,Payment_Date:'2026-10-04 12:25',Payment_Method:'UPI',Payment_Status:'Successful'}
  ],
  maintenance: [
    {Maintenance_ID:1,Station_Name:'VNR VJIET Station',Maintenance_Date:'2026-10-10',Maintenance_Type:'Connector inspection',Status:'Scheduled'},
    {Maintenance_ID:2,Station_Name:'HITEC City Station',Maintenance_Date:'2026-10-08',Maintenance_Type:'CHAdeMO service',Status:'In Progress'},
    {Maintenance_ID:3,Station_Name:'Financial District Station',Maintenance_Date:'2026-10-02',Maintenance_Type:'Firmware inspection',Status:'Completed'},
    {Maintenance_ID:4,Station_Name:'RC Puram Station',Maintenance_Date:'2026-10-12',Maintenance_Type:'Preventive maintenance',Status:'Scheduled'}
  ]
};

const $ = s => document.querySelector(s);
const esc = v => String(v ?? '').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
const money = v => '₹' + Number(v||0).toLocaleString('en-IN',{maximumFractionDigits:2});
const num = v => Number(v||0).toLocaleString('en-IN',{maximumFractionDigits:1});
const badge = s => `<span class="badge ${String(s).toLowerCase().replaceAll(' ','-')}">${esc(s)}</span>`;
const api = async (url, opts) => { const r=await fetch(url,opts); const d=await r.json(); if(!r.ok) throw new Error(d.error||'Request failed'); return d; };

function showToast(msg, error=false){const t=$('#toast');t.textContent=msg;t.className='toast show';if(error)t.style.background='#7f3737';else t.style.background='#18332c';setTimeout(()=>t.className='toast',2600)}

async function init(){
  try {
    const health=await api('/api/health'); state.connected=health.connected;
    if(state.connected) await loadAll();
    else loadDemo();
  } catch(e){ state.connected=false; loadDemo(); }
  updateDb();
  render();
}
function loadDemo(){
  Object.assign(state,{stations:demo.stations,points:demo.points,users:demo.users,reservations:demo.reservations,history:demo.history,payments:demo.payments,maintenance:demo.maintenance});
  const energy=demo.history.reduce((a,x)=>a+Number(x.Energy_Consumed),0), revenue=demo.payments.filter(x=>x.Payment_Status==='Successful').reduce((a,x)=>a+Number(x.Amount),0);
  state.dashboard={cards:{stations:4,points:8,available:4,occupied:2,energy,revenue},recent:demo.history,reservations:demo.reservations,maintenance:demo.maintenance.filter(x=>x.Status!=='Completed'),points:demo.points};
  state.analytics={utilization:demo.stations.map((s,i)=>({Station_ID:s.Station_ID,Station_Name:s.Station_Name,Sessions:[2,1,2,1][i]})),energy:demo.stations.map((s,i)=>({Station_ID:s.Station_ID,Station_Name:s.Station_Name,Energy_kWh:[52.7,36.7,74,18.6][i]})),revenue:demo.stations.map((s,i)=>({Station_ID:s.Station_ID,Station_Name:s.Station_Name,Revenue:[579.7,403.7,814,0][i]})),availability:[{Status:'Available',Count:4},{Status:'Occupied',Count:2},{Status:'Maintenance',Count:2}],maintenance:[{Status:'Completed',Count:1},{Status:'Scheduled',Count:2},{Status:'In Progress',Count:1}]};
}
async function loadAll(){
  const [d,st,p,u,r,h,pay,m,a]=await Promise.all([api('/api/dashboard'),api('/api/stations'),api('/api/points'),api('/api/users'),api('/api/reservations'),api('/api/history'),api('/api/payments'),api('/api/maintenance'),api('/api/analytics')]);
  Object.assign(state,{dashboard:d,stations:st,points:p,users:u,reservations:r,history:h,payments:pay,maintenance:m,analytics:a});
}
function updateDb(){ $('#dbDot').className='db-dot '+(state.connected?'online':'offline'); $('#dbLabel').textContent=state.connected?'MySQL connected':'Demo mode'; }

document.addEventListener('click',e=>{const b=e.target.closest('[data-page]');if(b){state.page=b.dataset.page;document.querySelectorAll('.nav-item,.info-nav').forEach(x=>x.classList.toggle('active',x===b));render();}});
$('#roleSelect').addEventListener('change',()=>showToast(`View switched to ${$('#roleSelect').value}`));

function render(){
  const titles={dashboard:'Network Dashboard',stations:'Charging Stations',points:'Charging Points',reservations:'Reservations',history:'Charging History',payments:'Payments',maintenance:'Maintenance',analytics:'Analytics & Optimization',system:'Database / System Information'};
  $('#pageTitle').textContent=titles[state.page];
  const views={dashboard:renderDashboard,stations:renderStations,points:renderPoints,reservations:renderReservations,history:renderHistory,payments:renderPayments,maintenance:renderMaintenance,analytics:renderAnalytics,system:renderSystem};
  $('#content').innerHTML=views[state.page]();
  bindPage();
}

function renderDashboard(){
 const c=state.dashboard?.cards||{};
 return `<div class="section-head"><div><h2>Network overview</h2><p>Current state of stations, charging infrastructure, energy and revenue.</p></div><span class="muted">${state.connected?'Live database values':'Demonstration dataset'}</span></div>
 <div class="cards">
 ${[['Total Charging Stations',c.stations,''],['Total Charging Points',c.points,''],['Available Points',c.available,''],['Occupied Points',c.occupied,''],['Energy Consumed',num(c.energy),'kWh'],['Total Revenue',money(c.revenue),'']].map(x=>`<div class="stat"><div class="label">${x[0]}</div><div class="value">${x[1]}<span class="unit">${x[2]}</span></div></div>`).join('')}
 </div>
 <div class="grid-2">
  <div class="panel"><div class="panel-head"><h3>Recent charging sessions</h3><span>SELECT + JOIN</span></div><div class="table-wrap">${sessionTable(state.dashboard?.recent||[])}</div></div>
  <div class="panel"><div class="panel-head"><h3>Current charging-point status</h3><span>LIVE STATUS</span></div><div class="panel-body">${statusBars(state.dashboard?.points||state.points)}</div></div>
 </div>
 <div class="grid-2" style="margin-top:16px">
  <div class="panel"><div class="panel-head"><h3>Upcoming reservations</h3><span>RESERVATION</span></div><div class="table-wrap">${reservationTable(state.dashboard?.reservations||[])}</div></div>
  <div class="panel"><div class="panel-head"><h3>Maintenance alerts</h3><span>MAINTENANCE</span></div><div class="table-wrap">${maintenanceTable(state.dashboard?.maintenance||[])}</div></div>
 </div>`;
}
function sessionTable(rows){return rows.length?`<table><thead><tr><th>Session</th><th>User / Vehicle</th><th>Station</th><th>Start</th><th>Energy</th></tr></thead><tbody>${rows.map(r=>`<tr><td class="mono">#${r.Session_ID}</td><td><b>${esc(r.Name)}</b><br><span class="muted">${esc(r.Registration_No)}</span></td><td>${esc(r.Station_Name)}</td><td>${esc(r.Start_Time)}</td><td>${num(r.Energy_Consumed)} kWh</td></tr>`).join('')}</tbody></table>`:'<div class="empty">No charging sessions found.</div>'}
function reservationTable(rows){return rows.length?`<table><thead><tr><th>User</th><th>Point</th><th>Date</th><th>Time</th><th>Status</th></tr></thead><tbody>${rows.map(r=>`<tr><td>${esc(r.Name)}</td><td>#${r.Point_ID}<br><span class="muted">${esc(r.Station_Name)}</span></td><td>${esc(r.Reservation_Date)}</td><td>${esc(r.Start_Time)}–${esc(r.End_Time)}</td><td>${badge(r.Status)}</td></tr>`).join('')}</tbody></table>`:'<div class="empty">No reservations.</div>'}
function maintenanceTable(rows){return rows.length?`<table><thead><tr><th>Station</th><th>Date</th><th>Type</th><th>Status</th></tr></thead><tbody>${rows.map(r=>`<tr><td>${esc(r.Station_Name)}</td><td>${esc(r.Maintenance_Date)}</td><td>${esc(r.Maintenance_Type)}</td><td>${badge(r.Status)}</td></tr>`).join('')}</tbody></table>`:'<div class="empty">No maintenance alerts.</div>'}
function statusBars(rows){const counts={Available:0,Occupied:0,Maintenance:0};rows.forEach(x=>counts[x.Status]++);const total=rows.length||1;return Object.entries(counts).map(([k,v])=>`<div class="bar-row"><div class="bar-label">${k}</div><div class="bar-track"><div class="bar-fill" style="width:${v/total*100}%"></div></div><div class="bar-value">${v} / ${total}</div></div>`).join('')}

function renderStations(){return `<div class="section-head"><div><h2>Charging station network</h2><p>Station-level infrastructure and point availability.</p></div></div><div class="grid-3">${state.stations.map(s=>`<div class="station-card" data-station="${s.Station_ID}"><div class="station-icon">⌂</div><h3>${esc(s.Station_Name)}</h3><p>${esc(s.Location)}</p><div class="station-metrics"><div><b>${s.Total_Points}</b><span>Total points</span></div><div><b>${s.Available_Points}</b><span>Available</span></div></div></div>`).join('')}</div>`}

function renderPoints(){return `<div class="section-head"><div><h2>Charging points</h2><p>Filter the Charging_Point relation by station, connector and availability.</p></div><div class="filters"><select id="pointStation" class="select"><option value="">All stations</option>${state.stations.map(s=>`<option value="${s.Station_ID}">${esc(s.Station_Name)}</option>`).join('')}</select><select id="pointConnector" class="select"><option value="">All connectors</option>${[...new Set(state.points.map(x=>x.Connector_Type))].map(x=>`<option>${esc(x)}</option>`).join('')}</select><select id="pointStatus" class="select"><option value="">All statuses</option><option>Available</option><option>Occupied</option><option>Maintenance</option></select></div></div><div class="panel"><div class="table-wrap"><table><thead><tr><th>Point ID</th><th>Station</th><th>Connector</th><th>Power</th><th>Status</th></tr></thead><tbody id="pointRows">${pointRows(state.points)}</tbody></table></div></div>`}
function pointRows(rows){return rows.length?rows.map(p=>`<tr><td class="mono">CP-${String(p.Point_ID).padStart(2,'0')}</td><td>${esc(p.Station_Name)}</td><td>${esc(p.Connector_Type)}</td><td>${num(p.Power_Rating)} kW</td><td>${badge(p.Status)}</td></tr>`).join(''):'<tr><td colspan="5"><div class="empty">No points match the selected filters.</div></td></tr>'}

function renderReservations(){return `<div class="grid-2"><div class="panel"><div class="panel-head"><h3>Create reservation</h3><span>INSERT → Reservation</span></div><div class="panel-body"><div class="notice">Select a valid user and charging point. The MySQL API checks foreign keys and prevents overlapping reservations.</div><form id="reservationForm"><div class="form-grid"><div class="field"><label>User</label><select id="rUser" required>${state.users.map(u=>`<option value="${u.User_ID}">${esc(u.Name)}</option>`).join('')}</select></div><div class="field"><label>Charging point</label><select id="rPoint" required>${state.points.map(p=>`<option value="${p.Point_ID}">CP-${String(p.Point_ID).padStart(2,'0')} · ${esc(p.Station_Name)} · ${esc(p.Status)}</option>`).join('')}</select></div><div class="field"><label>Reservation date</label><input id="rDate" type="date" required value="2026-10-08"></div><div class="field"><label>Start time</label><input id="rStart" type="time" required value="14:00"></div><div class="field"><label>End time</label><input id="rEnd" type="time" required value="15:00"></div><div class="field"><label>Status</label><select id="rStatus"><option>Confirmed</option><option>Pending</option></select></div></div><div class="form-actions"><button type="reset" class="secondary">Clear</button><button class="primary">Create reservation</button></div></form></div></div><div class="panel"><div class="panel-head"><h3>Existing reservations</h3><span>${state.reservations.length} records</span></div><div class="table-wrap">${reservationTable(state.reservations)}</div></div></div>`}

function renderHistory(){return `<div class="section-head"><div><h2>Charging history</h2><p>Multi-table JOIN: Users → Vehicle → Charging_Session → Charging_Point → Charging_Station.</p></div><div class="filters"><select id="historyUser" class="select"><option value="">All users</option>${state.users.map(u=>`<option value="${u.User_ID}">${esc(u.Name)}</option>`).join('')}</select></div></div><div class="panel"><div class="table-wrap"><table><thead><tr><th>User</th><th>Vehicle</th><th>Session</th><th>Station / Point</th><th>Start</th><th>End</th><th>Energy</th></tr></thead><tbody id="historyRows">${historyRows(state.history)}</tbody></table></div></div>`}
function historyRows(rows){return rows.length?rows.map(r=>`<tr><td><b>${esc(r.Name)}</b></td><td>${esc(r.Registration_No)}</td><td class="mono">#${r.Session_ID}</td><td>${esc(r.Station_Name)}<br><span class="muted">CP-${String(r.Point_ID).padStart(2,'0')}</span></td><td>${esc(r.Start_Time)}</td><td>${esc(r.End_Time||'Active')}</td><td>${num(r.Energy_Consumed)} kWh</td></tr>`).join(''):'<tr><td colspan="7"><div class="empty">No charging history for this user.</div></td></tr>'}

function renderPayments(){const total=state.payments.filter(x=>x.Payment_Status==='Successful').reduce((a,x)=>a+Number(x.Amount),0);return `<div class="section-head"><div><h2>Payments</h2><p>Payment records linked one-to-one with charging sessions.</p></div><div class="kpi-line"><div><b>${money(total)}</b><span>Successful revenue</span></div></div></div><div class="panel"><div class="table-wrap"><table><thead><tr><th>Payment</th><th>Session</th><th>User</th><th>Amount</th><th>Date</th><th>Method</th><th>Status</th></tr></thead><tbody>${state.payments.map(p=>`<tr><td class="mono">PAY-${String(p.Payment_ID).padStart(3,'0')}</td><td class="mono">#${p.Session_ID}</td><td>${esc(p.Name)}</td><td>${money(p.Amount)}</td><td>${esc(p.Payment_Date)}</td><td>${esc(p.Payment_Method)}</td><td>${badge(p.Payment_Status)}</td></tr>`).join('')}</tbody></table></div></div>`}

function renderMaintenance(){return `<div class="section-head"><div><h2>Maintenance records</h2><p>Track station-level preventive and corrective maintenance.</p></div><div class="filters"><select id="mStation" class="select"><option value="">All stations</option>${state.stations.map(s=>`<option value="${s.Station_ID}">${esc(s.Station_Name)}</option>`).join('')}</select><select id="mStatus" class="select"><option value="">All statuses</option><option>Completed</option><option>Scheduled</option><option>In Progress</option></select></div></div><div class="panel"><div class="table-wrap"><table><thead><tr><th>ID</th><th>Station</th><th>Date</th><th>Maintenance type</th><th>Status</th></tr></thead><tbody id="maintenanceRows">${maintenanceRows(state.maintenance)}</tbody></table></div></div>`}
function maintenanceRows(rows){return rows.length?rows.map(m=>`<tr><td class="mono">M-${String(m.Maintenance_ID).padStart(3,'0')}</td><td>${esc(m.Station_Name)}</td><td>${esc(m.Maintenance_Date)}</td><td>${esc(m.Maintenance_Type)}</td><td>${badge(m.Status)}</td></tr>`).join(''):'<tr><td colspan="5"><div class="empty">No maintenance records match the filters.</div></td></tr>'}

function renderAnalytics(){const a=state.analytics||{utilization:[],energy:[],revenue:[],availability:[],maintenance:[]};const max=(arr,key)=>Math.max(...arr.map(x=>Number(x[key])||0),1);return `<div class="section-head"><div><h2>Analytics & optimization</h2><p>Aggregated directly from database records using COUNT, SUM and GROUP BY.</p></div></div><div class="grid-3"><div class="panel chart-card"><h3>Station utilization</h3><p>COUNT(Session_ID) by station</p>${a.utilization.map(x=>`<div class="bar-row"><div class="bar-label">${esc(x.Station_Name)}</div><div class="bar-track"><div class="bar-fill" style="width:${Number(x.Sessions)/max(a.utilization,'Sessions')*100}%"></div></div><div class="bar-value">${x.Sessions}</div></div>`).join('')}</div><div class="panel chart-card"><h3>Energy consumption</h3><p>SUM(Energy_Consumed) in kWh</p>${a.energy.map(x=>`<div class="bar-row"><div class="bar-label">${esc(x.Station_Name)}</div><div class="bar-track"><div class="bar-fill" style="width:${Number(x.Energy_kWh)/max(a.energy,'Energy_kWh')*100}%"></div></div><div class="bar-value">${num(x.Energy_kWh)}</div></div>`).join('')}</div><div class="panel chart-card"><h3>Station revenue</h3><p>SUM(Payment.Amount), successful only</p>${a.revenue.map(x=>`<div class="bar-row"><div class="bar-label">${esc(x.Station_Name)}</div><div class="bar-track"><div class="bar-fill" style="width:${Number(x.Revenue)/max(a.revenue,'Revenue')*100}%"></div></div><div class="bar-value">${money(x.Revenue)}</div></div>`).join('')}</div></div><div class="grid-2" style="margin-top:16px"><div class="panel chart-card"><h3>Charging point availability</h3><p>GROUP BY Status</p>${a.availability.map(x=>`<div class="bar-row"><div class="bar-label">${esc(x.Status)}</div><div class="bar-track"><div class="bar-fill" style="width:${Number(x.Count)/(Math.max(...a.availability.map(y=>y.Count),1))*100}%"></div></div><div class="bar-value">${x.Count}</div></div>`).join('')}</div><div class="panel chart-card"><h3>Maintenance overview</h3><p>GROUP BY maintenance Status</p>${a.maintenance.map(x=>`<div class="bar-row"><div class="bar-label">${esc(x.Status)}</div><div class="bar-track"><div class="bar-fill" style="width:${Number(x.Count)/(Math.max(...a.maintenance.map(y=>y.Count),1))*100}%"></div></div><div class="bar-value">${x.Count}</div></div>`).join('')}</div></div>`}

function renderSystem(){return `<div class="section-head"><div><h2>Database / System Information</h2><p>How the application is organized around the relational database.</p></div></div><div class="info-grid"><div class="panel"><div class="panel-head"><h3>What this system is</h3><span>DBMS CORE</span></div><div class="panel-body"><p class="muted" style="line-height:1.7">EV Charging Network Management and Optimization is a database-driven academic prototype. Its primary purpose is to demonstrate how EV network operations can be represented, queried and managed through a normalized relational database rather than through static screens.</p><div class="notice">Database state: <b>${state.connected?'MySQL connected — values are read from SQL queries.':'Demo mode — sample records are loaded in the browser because MySQL is not currently connected.'}</b></div><p class="muted" style="line-height:1.7">The system supports SELECT, INSERT, JOIN, WHERE, GROUP BY, COUNT, SUM, ORDER BY, foreign-key validation and one-to-one payment linkage.</p></div></div><div class="panel"><div class="panel-head"><h3>Roles & responsibilities</h3><span>UPDATABLE WORKFLOW</span></div><div class="panel-body"><div class="entity-list"><div class="entity"><strong>Administrator</strong><span>Monitors stations and points, reviews reservations, payments and maintenance, and uses analytics to understand utilization, energy and revenue.</span></div><div class="entity"><strong>EV User</strong><span>Finds available charging points, creates reservations, views charging history and reviews payment records.</span></div><div class="entity"><strong>Database</strong><span>Stores authoritative records and relationships. Changes such as reservations are persisted through INSERT operations when MySQL is connected.</span></div></div></div></div><div class="panel"><div class="panel-head"><h3>Entity model</h3><span>8 TABLES</span></div><div class="panel-body"><div class="entity-list">${[['Users','1:N → Vehicle; 1:N → Reservation'],['Vehicle','N:1 → Users; 1:N → Charging_Session'],['Charging_Station','1:N → Charging_Point; 1:N → Maintenance'],['Charging_Point','N:1 → Charging_Station; 1:N → Charging_Session / Reservation'],['Charging_Session','N:1 → Vehicle / Charging_Point; 1:1 → Payment'],['Reservation','N:1 → Users / Charging_Point'],['Payment','1:1 → Charging_Session'],['Maintenance','N:1 → Charging_Station']].map(x=>`<div class="entity"><strong>${x[0]}</strong><span>${x[1]}</span></div>`).join('')}</div></div></div><div class="panel"><div class="panel-head"><h3>Data operations</h3><span>ACADEMIC DEMO</span></div><div class="panel-body"><div class="entity-list">${[['INSERT','Create a reservation after validating User_ID, Point_ID and time overlap.'],['SELECT','Read stations, points, reservations, history, payments and maintenance.'],['JOIN','Combine related entities for user history and payment context.'],['GROUP BY','Aggregate utilization, energy, revenue and maintenance counts.'],['COUNT / SUM','Measure sessions, points, energy and successful revenue.'],['UPDATE-READY','Status and master data are modeled for future CRUD screens without changing the schema.']].map(x=>`<div class="entity"><strong>${x[0]}</strong><span>${x[1]}</span></div>`).join('')}</div></div></div></div>`}

function bindPage(){
  if(state.page==='points'){
    ['pointStation','pointConnector','pointStatus'].forEach(id=>$('#'+id).addEventListener('change',async()=>{
      if(state.connected){const q=new URLSearchParams();if($('#pointStation').value)q.set('station',$('#pointStation').value);if($('#pointConnector').value)q.set('connector',$('#pointConnector').value);if($('#pointStatus').value)q.set('status',$('#pointStatus').value);$('#pointRows').innerHTML=pointRows(await api('/api/points?'+q));}
      else {let r=state.points;if($('#pointStation').value)r=r.filter(x=>x.Station_ID==$('#pointStation').value);if($('#pointConnector').value)r=r.filter(x=>x.Connector_Type==$('#pointConnector').value);if($('#pointStatus').value)r=r.filter(x=>x.Status===$('#pointStatus').value);$('#pointRows').innerHTML=pointRows(r);}
    }));
  }
  if(state.page==='history') $('#historyUser').addEventListener('change',async()=>{const id=$('#historyUser').value;if(state.connected) $('#historyRows').innerHTML=historyRows(await api('/api/history'+(id?'?userId='+id:'')));else $('#historyRows').innerHTML=historyRows(id?state.history.filter(x=>x.User_ID==id):state.history);});
  if(state.page==='maintenance') ['mStation','mStatus'].forEach(id=>$('#'+id).addEventListener('change',async()=>{if(state.connected){const q=new URLSearchParams();if($('#mStation').value)q.set('station',$('#mStation').value);if($('#mStatus').value)q.set('status',$('#mStatus').value);$('#maintenanceRows').innerHTML=maintenanceRows(await api('/api/maintenance?'+q));}else{let r=state.maintenance;if($('#mStation').value)r=r.filter(x=>x.Station_ID==$('#mStation').value);if($('#mStatus').value)r=r.filter(x=>x.Status===$('#mStatus').value);$('#maintenanceRows').innerHTML=maintenanceRows(r);}}));
  if(state.page==='reservations') $('#reservationForm').addEventListener('submit',createReservation);
  document.querySelectorAll('[data-station]').forEach(x=>x.addEventListener('click',()=>{state.page='points';render();setTimeout(()=>{if($('#pointStation')){$('#pointStation').value=x.dataset.station;$('#pointStation').dispatchEvent(new Event('change'));}},0)}));
}
async function createReservation(e){
 e.preventDefault();
 const body={userId:+$('#rUser').value,pointId:+$('#rPoint').value,date:$('#rDate').value,startTime:$('#rStart').value,endTime:$('#rEnd').value,status:$('#rStatus').value};
 try{
   if(state.connected){await api('/api/reservations',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});await loadAll();showToast('Reservation inserted into the Reservation table.');}
   else {const newId=Math.max(...state.reservations.map(x=>x.Reservation_ID),0)+1;const u=state.users.find(x=>x.User_ID===body.userId),p=state.points.find(x=>x.Point_ID===body.pointId);state.reservations.unshift({Reservation_ID:newId,User_ID:body.userId,Name:u.Name,Point_ID:body.pointId,Station_Name:p.Station_Name,Reservation_Date:body.date,Start_Time:body.startTime,End_Time:body.endTime,Status:body.status});showToast('Demo reservation created locally. Connect MySQL to persist it.');}
   render();
 }catch(err){showToast(err.message,true);}
}
init();
