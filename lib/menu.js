// Menu
const inquirer = require("inquirer");
const mysql = require("mysql2");
const userActions = require("./questions");

// Connect to MySQL database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "nurses_db",
});

// Establish database connection
db.connect((err) => {
  if (err) {
    console.error("Unable to connect to database:", err);
  } else {
    console.log(`Connected to the nurses_db database.`);
  }
});

function menu() {
  inquirer
    .prompt([
      {
        name: "menu",
        type: "list",
        message: "Select a choice:",
        choices: [
          "Close Program",
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee role",
          // TODO: Add other cases...
        ],
      },
    ])
    .then((answers) => {
      console.log(answers.menu);
      switch (answers.menu) {
        case "View all departments":
          viewDepartments();
          break;
        case "View all employees":
          viewEmployees();
          break;
        case "View all roles":
          viewRolesNow();
          break;
        case "Add a department":
          addDepartmentNow();
          break;
        case "Add a role":
          addRole();
          break;
        // TODO: Add other cases here....
        case "Close Program":
          closeConnection();
          break;
        default:
          console.error("No case was found.");
          closeConnection();
      }
    });
}

// ! Made function to get out of switch/case
function closeConnection() {
  db.end((error) => {
    if (error) {
      console.error("Error closing MySQL connection:", error);
      return;
    }
    console.log("MySQL connection closed.");
  });
}

function viewDepartments() {
  // Define 'sql' within the function
  const sql = `SELECT * FROM neonatal_departments`;
  db.query(sql, (err, res) => {
    if (err) {
      console.log(err);
    }
    console.table(res);
    menu();
  });
}
// JOIN employees e ON r.hourly = r.hourly
function viewRolesNow() {
  // Define 'sql' within the function
  const sql = `SELECT
  title AS Title,
  r.id AS ID,
  d.name AS Department,
  hourly AS Hourly
FROM
  roles r
  JOIN neonatal_departments d ON r.department_id = d.id;`;
  db.query(sql, (err, res) => {
    if (err) {
      console.log(err);
    }
    console.table(res);
    menu();
  });
}
// Look at 101 -^ Joining all employees e ? And... ?
// Mariah's Section VIEW ALL EMPLOYEES

const sql = `SELECT role.id, 
                        role.title, 
                        role.hourly,
                        department.name AS department FROM role
                        INNER JOIN department ON role.department_id = department.id`;

//replace role_id with title
// Need to see employee IDs, first names, salaries, managers
function viewEmployees() {
  const sql = `SELECT
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
  JOIN neonatal_departments d ON r.department_id = d.id;`;
  db.query(sql, (err, res) => {
    if (err) {
      console.log(err);
    }
    console.table(res);
    menu();
  });
}

// TODO: Add Department
// TODO: > Prompted to enter name of department...
// TODO: > and that department is added to database
// "Add a department",
function addDepartmentNow() {
  console.log("First PLACE");
  userActions.userAddDepartment().then((answers) => {
    const sql = `INSERT INTO neonatal_departments SET ?`;
    db.query(sql, answers, (err, res) => {
      if (err) {
        console.log(err);
      }
      console.table(res);
      menu();
    });
  });
}

// TODO: Add Role
// TODO: > Prompted to enter name, salary, and department for added role...
// TODO: > role is added to database
// TODO: >

function addRole() {
  userActions.userAddRole().then((answers) => {
    const sql = `INSERT INTO roles SET ?`;
    db.query(sql, answers, (err, res) => {
      if (err) {
        console.log(err);
      }
      console.table(res);
      menu();
    });
  });
}

// "Add a role",
// function addRoles() {
//   const sql = ``;
//   db.query(sql, (err, res) => {
//     if (err) {
//       console.log(err);
//     }
//     console.table(res);
//     menu();
//   });
// }

// "Add an employee",
// function addEmployee() {
//   const sql = ``;
//   db.query(sql, (err, res) => {
//     if (err) {
//       console.log(err);
//     }
//     console.table(res);
//     menu();
//   });
// }

// "Update an employee role",
// function updateEmployee() {
//   const sql = ``;
//   db.query(sql, (err, res) => {
//     if (err) {
//       console.log(err);
//     }
//     console.table(res);
//     menu();
//   });
// }

module.exports = menu;
