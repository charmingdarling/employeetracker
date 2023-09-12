-- TODO: Change tables to singular not plural
-- TODO: Look at the FOREIGN KEYS each employee is assigned to every role
-- TODO: Somehow, I am iterating over EVERY employee x role. 14 x 16 = 224 (-1 since index); WTF
-- TODO: cartesian table issue? SOMETHING WRONG WITH SELECT
-- ? View All Employees: viewEmployees()
SELECT
  e.id,
  e.firstName,
  e.lastName,
  r.title,
  d.name,
  r.hourly,
  (
    SELECT
      CONCAT (m.firstName, ' ', m.lastName)
    FROM
      employees m
    WHERE
      m.id = e.manager_id
  ) as manager
FROM
  employees e
  JOIN roles r ON e.role_id = r.id
  JOIN neonatal_departments d ON r.department_id = d.id;

-- ? View All Roles -- 
SELECT
  title AS Title,
  r.id AS ID,
  d.name AS Department,
  hourly AS Hourly
FROM
  roles r
  JOIN employees e ON r.hourly = r.hourly
  JOIN neonatal_departments d ON r.department_id = d.id;

-- ? Employee Full Name, Title, Manager Name
-- I've used e as an alias for the employees table representing employees.
-- I've used m as an alias for the employees table representing managers.
SELECT
  CONCAT (e.firstName, ' ', e.lastName) AS Employee,
  r.title AS Role_Title,
  CONCAT (m.firstName, ' ', m.lastName) AS Manager_Name
FROM
  employees e
  LEFT JOIN roles r ON e.role_id = r.id
  LEFT JOIN employees m ON e.manager_id = m.id
ORDER BY
  e.firstName,
  e.lastName,
  r.title,
  Manager_Name;

-- ? Add Department
-- TODO: Add Department
-- TODO: > Prompted to enter name of department...
-- TODO: > and that department is added to database
INSERT INTO
  neonatal_departments (name)
VALUES
  ('New Department');

-- * Unsure if I need a placeholder in here in values or not. How do I add the user input?
-- TODO: Add Role
-- TODO: > Prompted to enter name, salary, and department for added role...
-- TODO: > role is added to database
--
-- ? Add Role
-- * I am running into a COLUMN COUNT ERROR below
INSERT INTO
  roles (id, title, hourly, department_id)
VALUES
  ('New Role');

-- * Unsure if I need a placeholder in here in values or not. How do I add the user input?
-- TODO: Add Employee > Prompted to enter the employee's first name, last name, role, and manager > Employee added to database
-- TODO: Update Employee > Prompted to select an employee to update, their new role, and this information is updated into database
-- <Break>
-- Find all employees, bring in the departments that the employee belongs to and brought in the manager ADD
-- Employee table > join left > role > join left department (role belongs to) > join left employee with manager_id
-- concat(manager.firstName, " ", manager.LastName) AS manager (to rename for better reading)
--
-- ? Budget
SELECT
  neonatal_departments.id,
  neonatal_departments.name,
  SUM(roles.hourly) AS Shift_Budget
FROM
  employees
  LEFT JOIN roles ON employees.role_id = roles.id
  LEFT JOIN neonatal_departments ON roles.department_id = neonatal_departments.id
GROUP BY
  neonatal_departments.id,
  neonatal_departments.name;