CREATE DATABASE IF NOT EXISTS ev_charging_db;
USE ev_charging_db;

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS Payment;
DROP TABLE IF EXISTS Maintenance;
DROP TABLE IF EXISTS Reservation;
DROP TABLE IF EXISTS Charging_Session;
DROP TABLE IF EXISTS Charging_Point;
DROP TABLE IF EXISTS Charging_Station;
DROP TABLE IF EXISTS Vehicle;
DROP TABLE IF EXISTS Users;
SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE Users (
    User_ID INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(100) NOT NULL,
    Email VARCHAR(150) NOT NULL UNIQUE,
    Phone VARCHAR(20) NOT NULL
);

CREATE TABLE Vehicle (
    Vehicle_ID INT PRIMARY KEY AUTO_INCREMENT,
    User_ID INT NOT NULL,
    Registration_No VARCHAR(30) NOT NULL UNIQUE,
    Model VARCHAR(100) NOT NULL,
    Battery_Capacity DECIMAL(6,2) NOT NULL,
    CONSTRAINT fk_vehicle_user
        FOREIGN KEY (User_ID) REFERENCES Users(User_ID)
        ON UPDATE CASCADE ON DELETE RESTRICT
);

CREATE TABLE Charging_Station (
    Station_ID INT PRIMARY KEY AUTO_INCREMENT,
    Station_Name VARCHAR(120) NOT NULL,
    Location VARCHAR(200) NOT NULL,
    Latitude DECIMAL(10,7),
    Longitude DECIMAL(10,7)
);

CREATE TABLE Charging_Point (
    Point_ID INT PRIMARY KEY AUTO_INCREMENT,
    Station_ID INT NOT NULL,
    Connector_Type VARCHAR(50) NOT NULL,
    Power_Rating DECIMAL(7,2) NOT NULL,
    Status ENUM('Available','Occupied','Maintenance') NOT NULL DEFAULT 'Available',
    CONSTRAINT fk_point_station
        FOREIGN KEY (Station_ID) REFERENCES Charging_Station(Station_ID)
        ON UPDATE CASCADE ON DELETE RESTRICT
);

CREATE TABLE Charging_Session (
    Session_ID INT PRIMARY KEY AUTO_INCREMENT,
    Vehicle_ID INT NOT NULL,
    Point_ID INT NOT NULL,
    Start_Time DATETIME NOT NULL,
    End_Time DATETIME NULL,
    Energy_Consumed DECIMAL(10,2) NOT NULL DEFAULT 0,
    CONSTRAINT fk_session_vehicle
        FOREIGN KEY (Vehicle_ID) REFERENCES Vehicle(Vehicle_ID)
        ON UPDATE CASCADE ON DELETE RESTRICT,
    CONSTRAINT fk_session_point
        FOREIGN KEY (Point_ID) REFERENCES Charging_Point(Point_ID)
        ON UPDATE CASCADE ON DELETE RESTRICT
);

CREATE TABLE Reservation (
    Reservation_ID INT PRIMARY KEY AUTO_INCREMENT,
    User_ID INT NOT NULL,
    Point_ID INT NOT NULL,
    Reservation_Date DATE NOT NULL,
    Start_Time TIME NOT NULL,
    End_Time TIME NOT NULL,
    Status ENUM('Confirmed','Pending','Cancelled') NOT NULL DEFAULT 'Pending',
    CONSTRAINT fk_reservation_user
        FOREIGN KEY (User_ID) REFERENCES Users(User_ID)
        ON UPDATE CASCADE ON DELETE RESTRICT,
    CONSTRAINT fk_reservation_point
        FOREIGN KEY (Point_ID) REFERENCES Charging_Point(Point_ID)
        ON UPDATE CASCADE ON DELETE RESTRICT,
    CONSTRAINT chk_reservation_time CHECK (End_Time > Start_Time)
);

CREATE TABLE Payment (
    Payment_ID INT PRIMARY KEY AUTO_INCREMENT,
    Session_ID INT NOT NULL UNIQUE,
    Amount DECIMAL(10,2) NOT NULL,
    Payment_Date DATETIME NOT NULL,
    Payment_Method VARCHAR(40) NOT NULL,
    Payment_Status ENUM('Successful','Pending','Failed') NOT NULL DEFAULT 'Pending',
    CONSTRAINT fk_payment_session
        FOREIGN KEY (Session_ID) REFERENCES Charging_Session(Session_ID)
        ON UPDATE CASCADE ON DELETE RESTRICT
);

CREATE TABLE Maintenance (
    Maintenance_ID INT PRIMARY KEY AUTO_INCREMENT,
    Station_ID INT NOT NULL,
    Maintenance_Date DATE NOT NULL,
    Maintenance_Type VARCHAR(100) NOT NULL,
    Status ENUM('Completed','Scheduled','In Progress') NOT NULL DEFAULT 'Scheduled',
    CONSTRAINT fk_maintenance_station
        FOREIGN KEY (Station_ID) REFERENCES Charging_Station(Station_ID)
        ON UPDATE CASCADE ON DELETE RESTRICT
);

CREATE INDEX idx_vehicle_user ON Vehicle(User_ID);
CREATE INDEX idx_point_station ON Charging_Point(Station_ID);
CREATE INDEX idx_session_vehicle ON Charging_Session(Vehicle_ID);
CREATE INDEX idx_session_point ON Charging_Session(Point_ID);
CREATE INDEX idx_reservation_user ON Reservation(User_ID);
CREATE INDEX idx_reservation_point ON Reservation(Point_ID);
CREATE INDEX idx_maintenance_station ON Maintenance(Station_ID);
