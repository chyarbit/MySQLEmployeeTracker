-- Drops the cms_db if it exists currently --
DROP DATABASE IF EXISTS cms_db;
-- Creates the "cms_db" database --
CREATE DATABASE cms_db;

-- Makes it so all of the following code will affect cms_db --
USE cms_db;

-- Create a table called "department" within cms_db --
CREATE TABLE department (
  -- Make an integer column called "id"--
  id INTEGER(30) NOT NULL,
  -- Make a string column called "name" with 30 character limit--
  name VARCHAR(30) NOT NULL,
  -- Make the "id" column the primary key --
  PRIMARY KEY (id)
); 

-- Create a table called "role" within cms_db --
CREATE TABLE role (
  -- Make an integer column called "id"--
  id INTEGER(30) NOT NULL,
  -- Make a string column called "title" with 30 character limit--
  title VARCHAR(30) NOT NULL,
  -- Make a string column called "salary" --
  salary DECIMAL(6,0) NOT NULL,
  -- Make an integer column called "department_id"--
  department_id INTEGER(30) NOT NULL,
  -- Make the "id" column the primary key --
  PRIMARY KEY (id)
); 

-- Create a table called "employee" within cms_db --
CREATE TABLE employee (
  -- Make an integer column called "id"--
  id INTEGER NOT NULL AUTO_INCREMENT,
  -- Make a string column called "first_name" with 30 character limit--
  first_name VARCHAR(30) NOT NULL,
  -- Make a string column called "last_name" with 30 character limit--
  last_name VARCHAR(30) NOT NULL,
  -- Make an integer column called "role_id"--
  role_id INTEGER(30) NOT NULL,
  -- Make an integer column called "manager_id"--
  manager_id INTEGER(30),
  -- Make the "id" column the primary key --
  PRIMARY KEY (id)
); 

-- Starting information for the department table --
INSERT INTO department (id, name)
VALUES (1, "Finance"), (2, "Executive"), (3, "IT"), (4, "Admin");

-- Starting information for the role table --
INSERT INTO role (id, title, salary, department_id)
VALUES (1, "Accountant", 75000, 1), (2, "Client Manager", 50000, 4), (3, "Database Engineer", 60000, 3), (4, "Executive Director", 250000, 2);

-- Starting information for the employee table --
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Abby", "Anderson", 1, 100), ("Bob", "Brown", 2, 200), ("Calvin", "Cooper", 3, 300), ("Debbie", "Downer", 4, null);
