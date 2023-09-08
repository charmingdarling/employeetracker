// Menu
const inquirer = require("inquirer");
const db = require("index");
const cTable = require("console.table");

//Create a table
const table = new Table();

function menu() {
  inquirer
    .prompt({
      name: "menu",
      type: "list",
      message: "Select a choice:",
      choices: [
        "View all departments",
        "View all employees",
        // "View all roles",
        // "Add a department",
        // "Add a role",
        // "Add an employee",
        // "Update an employee role",
        // "Update an employee manager",
        // "View employees by department",
        // "Add a manager",
        // "Delete department",
        // "Delete role",
        // "Delete employee",
        // "View the total dayshift department budget of employees",
        // "View the total nightshift department budget of employees",
      ],
    })
    .then((answers) => {
      switch (answers.menu) {
        case "View all departments":
          viewDepartments();
          break;
        case "View all employees":
          viewEmployee();
          break;
        // case "View all roles":
        //   viewRole();
        //   break;
        // case "Add a department":
        //   viewRole();
        //   break;
        // case "Add a role":
        //   addDepartment();
        //   break;
        // case "Add an employee":
        //   addEmployee();
        //   break;
        // case "Update employee role":
        //   updateEmployeeRole();
        //   break;
        // case "Update employee manager":
        //   updateEmployeeManager();
        //   break;
        // case "View employees by department":
        //   viewEmployeeByDepartment();
        //   break;
        // case "Add a manager":
        //   addManager();
        //   break;
        // case "Delete department":
        //   deleteDepartment();
        //   break;
        // case "Delete role":
        //   deleteRole();
        //   break;
        // case "Delete employee":
        //   deleteEmployee();
        //   break;
        // case "Dayshift hourly budget":
        //   dayshiftBudget();
        //   break;
        // case "Nightshift hourly budget":
        //   nightshiftBudget();
        //   break;
        default:
          process.exit(); // Node.JS thingy
      }
      menu(); //Menu will invoke self again.
    });
}

function viewDepartments() {
  const query = `SELECT * FROM neonatal_departments`;
  db.query(query, (err, res) => {
    if (err) {
      console.log(err);
    }
    console.table(res);
  });
}

function viewEmployees() {
  const query = `SELECT * FROM neonatal_departments`;
  db.query(query, (err, res) => {
    if (err) {
      console.log(err);
    }
    console.table(res);
  });
}

// function viewRoles() {
//   const query = `SELECT * FROM neonatal_departments`;
//   db.query(query, (err, res) => {
//     if (err) {
//       console.log(err);
//     }
//     console.table(res);
//   });
// }

// function addDepartment() {
//   const query = `SELECT * FROM neonatal_departments`;
//   db.query(query, (err, res) => {
//     if (err) {
//       console.log(err);
//     }
//     console.table(res);
//   });
// }

// function addRoles() {
//   const query = `SELECT * FROM neonatal_departments`;
//   db.query(query, (err, res) => {
//     if (err) {
//       console.log(err);
//     }
//     console.table(res);
//   });
// }

// function addEmployee() {
//   const query = `SELECT * FROM neonatal_departments`;
//   db.query(query, (err, res) => {
//     if (err) {
//       console.log(err);
//     }
//     console.table(res);
//   });
// }

// function updateEmployee() {
//   const query = `SELECT * FROM neonatal_departments`;
//   db.query(query, (err, res) => {
//     if (err) {
//       console.log(err);
//     }
//     console.table(res);
//   });
// }

// function updateEmployeeRole() {
//   const query = `SELECT * FROM neonatal_departments`;
//   db.query(query, (err, res) => {
//     if (err) {
//       console.log(err);
//     }
//     console.table(res);
//   });
// }

// function addManager() {
//   const query = `SELECT * FROM neonatal_departments`;
//   db.query(query, (err, res) => {
//     if (err) {
//       console.log(err);
//     }
//     console.table(res);
//   });
// }

// # console.table - Allows us to access the table and portray which columns we have
// Left.join - allows us on the table that shows us every single employee

module.exports = menu;
