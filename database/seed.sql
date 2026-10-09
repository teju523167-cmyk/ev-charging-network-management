USE ev_charging_db;

INSERT INTO Users (Name, Email, Phone) VALUES
('Ananya Rao','ananya.rao@example.com','9876501001'),
('Rahul Mehta','rahul.mehta@example.com','9876501002'),
('Sneha Iyer','sneha.iyer@example.com','9876501003'),
('Arjun Kumar','arjun.kumar@example.com','9876501004');

INSERT INTO Vehicle (User_ID, Registration_No, Model, Battery_Capacity) VALUES
(1,'TS09EV1001','Tata Nexon EV',40.50),
(2,'TS08EV2042','MG ZS EV',50.30),
(3,'TS10EV7788','Hyundai Ioniq 5',72.60),
(4,'TS07EV5512','Tata Curvv EV',55.00);

INSERT INTO Charging_Station (Station_Name, Location, Latitude, Longitude) VALUES
('VNR VJIET Station','Bachupally, Hyderabad',17.5204,78.3671),
('HITEC City Station','Madhapur, Hyderabad',17.4483,78.3915),
('Financial District Station','Nanakramguda, Hyderabad',17.4141,78.3424),
('RC Puram Station','Ramachandra Puram, Hyderabad',17.5109,78.3048);

INSERT INTO Charging_Point (Station_ID, Connector_Type, Power_Rating, Status) VALUES
(1,'CCS2',60,'Available'),
(1,'Type 2',22,'Occupied'),
(2,'CCS2',120,'Available'),
(2,'CHAdeMO',50,'Maintenance'),
(3,'CCS2',150,'Available'),
(3,'Type 2',22,'Available'),
(4,'CCS2',60,'Occupied'),
(4,'Type 2',22,'Available');

INSERT INTO Charging_Session (Vehicle_ID, Point_ID, Start_Time, End_Time, Energy_Consumed) VALUES
(1,2,'2026-10-07 09:15:00','2026-10-07 10:42:00',28.40),
(2,3,'2026-10-07 12:05:00','2026-10-07 12:51:00',36.70),
(3,5,'2026-10-06 18:20:00','2026-10-06 19:12:00',42.10),
(4,7,'2026-10-08 07:45:00',NULL,18.60),
(1,1,'2026-10-05 15:10:00','2026-10-05 16:02:00',24.30),
(2,6,'2026-10-04 11:25:00','2026-10-04 12:18:00',31.90);

INSERT INTO Reservation (User_ID, Point_ID, Reservation_Date, Start_Time, End_Time, Status) VALUES
(1,1,'2026-10-08','14:00:00','15:00:00','Confirmed'),
(2,3,'2026-10-08','16:30:00','17:30:00','Pending'),
(3,6,'2026-10-09','09:00:00','10:00:00','Confirmed'),
(4,8,'2026-10-09','11:30:00','12:30:00','Confirmed');

INSERT INTO Payment (Session_ID, Amount, Payment_Date, Payment_Method, Payment_Status) VALUES
(1,312.40,'2026-10-07 10:50:00','UPI','Successful'),
(2,403.70,'2026-10-07 12:58:00','Card','Successful'),
(3,463.10,'2026-10-06 19:20:00','UPI','Successful'),
(4,204.60,'2026-10-08 08:10:00','Wallet','Pending'),
(5,267.30,'2026-10-05 16:10:00','Card','Successful'),
(6,350.90,'2026-10-04 12:25:00','UPI','Successful');

INSERT INTO Maintenance (Station_ID, Maintenance_Date, Maintenance_Type, Status) VALUES
(1,'2026-10-10','Connector inspection','Scheduled'),
(2,'2026-10-08','CHAdeMO service','In Progress'),
(3,'2026-10-02','Firmware inspection','Completed'),
(4,'2026-10-12','Preventive maintenance','Scheduled');
