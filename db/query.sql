-- TODO: Change tables to singular not plural
-- !View All Employees
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

-- ! View All Roles -- 
SELECT
  title AS Title,
  r.id AS ID,
  d.name AS Department,
  hourly AS Hourly
FROM
  roles r
  JOIN employees e ON r.hourly = r.hourly
  JOIN neonatal_departments d ON r.department_id = d.id;

--!Employee Full Name, Title, Manager Name
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

--
-- <Break>
-- Find all employees, bring in the departments that the employee belongs to and brought in the manager ADD
-- Employee table > join left > role > join left department (role belongs to) > join left employee with manager_id
-- concat(manager.firstName, " ", manager.LastName) AS manager (to rename for better reading)
--
-- !Budget
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