DROP DATABASE IF EXISTS nurses_db;

CREATE DATABASE nurses_db;

USE nurses_db;

CREATE TABLE
    neonatal_departments (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(30) NOT NULL
    );

CREATE TABLE
    roles (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    hourly DECIMAL NOT NULL,
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES neonatal_departments (id) ON DELETE SET NULL
);

CREATE TABLE
    employees (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        firstName VARCHAR(30) NOT NULL,
        lastName VARCHAR(40) NOT NULL,
        role_id INT,
        manager_id INT,
        FOREIGN KEY (role_id) REFERENCES roles (id) ON DELETE SET NULL,
        FOREIGN KEY (manager_id) REFERENCES employees (id) ON DELETE SET NULL
    );