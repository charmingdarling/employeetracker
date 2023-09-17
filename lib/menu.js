// const { readFromFile, readAndAppend } = require("./helpers/fsUtils");
// module.exports = { readFromFile, writeToFile, readAndAppend };

//? Menu
const inquirer = require("inquirer");
const mysql = require("mysql2");
const userActions = require("./questions");
const { AskDatabase } = require("../config/database");

// //? Connect to the database
// //? Establish database connection and error
//? Establish database connection
// // * Connecting to database using answers as a value.
// function databaseConnection() {
//   let sql;
//   let answers;
//   db.query(sql, (err, res) => {
//     if (err) {
//       console.log(err);
//     }
//     console.table(res);
//     menu();
//   });
// }

// // ? Get out of Switch/Case, Close Program
// function closeConnection() {
//   db.end((error) => {
//     if (error) {
//       console.error("Error closing connection:", error);
//       return;
//     }
//     console.log("Connection closed.");
//   });
// }

// --------------------------------- //
// ------------- MENU  ------------- //
// --------------------------------- //

//? Menu List Prompt

// * Show menu, handle user selection, manage program direction and flow
function menu() {
  // * Prompt user to select options per a menu
  inquirer
    .prompt([
      // * Menu
      {
        name: "menu",
        type: "list",
        message: "Select a choice:",
        // * Available user actions
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
    // * Per user actions, call the correlating function
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
          viewRoles();
          break;
        case "Add a department":
          addDepartment();
          break;
        case "Add a role":
          addRole();
          break;
        case "Add an employee":
          addEmployee();
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

// TODO: async function >
// TODO: ..> await Query.releventFunction()
// TODO: ..> console.table(relevantTable)
// OR
// TODO: async function >
// TODO: ..> await showMenu.releventFunction()

// async function viewAllDepartments() {
//   const departments = await Query.dbSelectAllDepartments();
//   console.table(departments);

//   static async dbSelectAllDepartments() {
//     const sql = 'SELECT id, name as department FROM circus_db.department ORDER BY id;';
//     const result = await Database.connection.promise().query(sql);
//     return result[0];

function connect() {
  let sql;
  // let answers;
  AskDatabase.databaseConnection.query(sql, (err, res) => {
    if (err) {
      console.log(err);
    }
    console.table(res);
    menu();
  });
}

// ? Async View Departments
// Starting an async function to view departments
async function viewDepartments() {
  const viewDepartments =
    await AskDatabase.databaseConnection.viewDepartments();
  console.table(viewDepartments);
}

// ? View Departments
// function viewDepartments() {
//   //? Define 'sql' within the function
//   connect();
//   const sql = `SELECT * FROM neonatal_departments`;
//   // const result await this
//   // pullQueryHandleError(sql);
//   // }
//   db.query(sql, (err, res) => {
//     if (err) {
//       console.log(err);
//     }
//     console.table(res);
//     menu();
//   });
// }

// ? View Roles
function viewRoles() {
  const sql = `SELECT
    title AS Title,
    r.id AS ID,
    d.name AS Department,
    hourly AS Hourly
  FROM roles r
  JOIN neonatal_departments d ON r.department_id = d.id;`;
  db.query(sql, (err, res) => {
    if (err) {
      console.log(err);
    }
    console.table(res);
    menu();
  });
}

// ? View Employees
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

// ? Add Department
// userActions is a constant from questions.js
function addDepartment() {
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

// ! OG Do not mess with. This works
// ! I can delete this, but scared to...attachment issues
// function addRole() {
//   userActions.userAddRole().then((answers) => {
//     const sql = `INSERT INTO roles SET ?`;
//     db.query(sql, answers, (err, res) => {
//       if (err) {
//         console.log(err);
//       }
//       console.table(res);
//       menu();
//     });
//   });
// }

// ! STUFF -
// * Prompts: Type (Input/List)
// * How do I want to display the choices?
// * Is it dynamic list or user input.
// * Functions on each prompts -> Example: Title, Hourly, Department ID etc.

function addRole() {
  const sql = "SELECT * FROM neonatal_departments";
  db.query(sql, (err, resp) => {
    if (err) {
      console.error("Error executing the query:", err);
    }
    let departmentNames = [];
    resp.forEach((newDepartment) => {
      departmentNames.push(newDepartment.name);
    });

    departmentNames.push("Add new department");
    inquirer
      .prompt([
        {
          name: "departmentName",
          type: "list",
          message: "Which Department is this new role in?",
          choices: departmentNames,
        },
      ])
      .then((answer) => {
        if (answer.departmentName === "Add new department") {
          addDepartment();
        } else {
          addNewRole(answer);
        }
      });

    const addNewRole = (roleData) => {
      inquirer
        .prompt([
          {
            name: "newTitle",
            type: "input",
            message: "What is your new role called?",
            validate: function (answer) {
              if (answer.length < 1) {
                return console.log("Please enter a valid title.");
              }
              return true;
            },
          },
          {
            name: "hourly",
            type: "input",
            message: "What is the hourly pay of this role?",
            validate: function (answer) {
              if (answer.length < 1) {
                return console.log("Please enter a valid title.");
              }
              return true;
            },
          },
        ])
        .then((answer) => {
          let addedRole = answer.newTitle;
          let departmentId;

          resp.forEach((newDepartment) => {
            if (roleData.departmentName === newDepartment.name) {
              departmentId = newDepartment.id;
            }
          });
          let sql = `INSERT INTO roles (title, hourly, department_id) VALUES (?, ?, ?)`;
          let criteria = [addedRole, answer.hourly, departmentId];

          db.query(sql, criteria, (err, res) => {
            if (err) {
              console.log(err);
            }
            console.table(res);
            menu();
          });
        });
    };
  });
}

// ? "Add an employee"
// TODO: Prompted to enter:
// TODO:  -- employee's first name,
// TODO:  -- last name,
// TODO:  -- role,
// TODO:  -- and manager
// TODO: Employee added to database

// ! Trying to rework the function with SELECT * FROM for sql

// function addEmployee() {
//   const answers = userActions.userAddEmployee();
// }

//   const sql = `SELECT
//   id,
//   title
// FROM
//   roles;`;
// }

// addEmployee TODO:
// > make menu
// >display menu
// > 2 queries is where we get the information
// > grab info from users
// > run insert

// function addEmployee() {
//   userActions.userAddEmployee().then((answers) => {
//     const sql = `INSERT INTO employees SET ?`;
//     let employeeName = [];
//     res.forEach((newEmployee) => {
//       employeeName.push(newEmployee.firstName);
//     });
//     db.query(sql, answers, (err, res) => {
//       if (err) {
//         console.log(err);
//       }
//       console.table(res);
//       menu();
//     });
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
