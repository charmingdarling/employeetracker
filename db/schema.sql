DROP DATABASE IF EXISTS nurses_db;

CREATE DATABASE nurses_db;

USE nurses_db;

CREATE TABLE
    neonatal_departments(
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(30) NOT NULL,
    )

CREATE TABLE
    role (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(30) NOT NULL,
        hourly DECIMAL NOT NULL,
        department_id INT NOT NULL,
    )

CREATE TABLE
    employees (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        first_name VARCHAR(30) NOT NULL,
        last_name VARCHAR(40) NOT NULL,
        role_id VARCHAR (30) NOT NULL,
        manager_id VARCHAR (30) NOT NULL,
    )