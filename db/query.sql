SELECT roles.id, roles.title, neonatal_departments.name AS Neonatal_Department FROM roles 
LEFT JOIN neonatal_departments 
ON roles.department_id = neonatal_departments.id

SELECT neonatal_departments.id, neonatal_departments.name, SUM(roles.hourly) AS Shift_Budget FROM employees
LEFT JOIN roles
ON employees.role_id = roles.id
LEFT JOIN neonatal_departments
ON roles.department_id = neonatal_departments.id
GROUP BY neonatal_departments.id, neonatal_departments.name;

-- Find all employees, bring in the departments that the employee belongs to and brought int he manager ADD
-- Employee table > join left > role > join left department (role belongs to) > join left employee with manager_id
-- concat(manager.firstName, " ", manager.LastName) AS manager (to rename for better reading)
--