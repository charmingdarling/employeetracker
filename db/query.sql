-- !View All Employees
-- TODO: Try and figure out if you can replace manager_id with employee name
-- TODO: SUBQUERIES. (NESTED SELECT)
SELECT
  employees.id,
  CONCAT (employees.firstName, " ", employees.lastName) AS Employee,
  roles.hourly AS Hourly,
  CONCAT (employees.manager_id) AS Manager_Name -- INNER SELECT
FROM
  employees e
  RIGHT JOIN roles ON employees.manager_id = employees.manager_id
GROUP BY
  employees.id,
  employees.firstName,
  employees.lastName,
  manager_id,
  roles.hourly;

-- !Employee Full Name, Title, Manager Name
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
GROUP BY
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