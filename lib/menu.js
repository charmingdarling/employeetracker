//? Menu
const inquirer = require("inquirer");
const mysql = require("mysql2");
const userActions = require("./questions");

//? Connect to MySQL database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "nurses_db",
});

//? Establish database connection
db.connect((err) => {
  if (err) {
    console.error("Unable to connect to database:", err);
  } else {
    console.log(`Connected to the nurses_db database.`);
  }
});

//? Menu List Prompt

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
    // // const answers = await inquirer.prompt(questions);
    // switch(answers) {
    //   case:
    //     work
    //     work
    //     break;
    //   case:
    //     work
    //     work
    //     break;
    //   default //catch all
    // }
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

// ? Get out of Switch/Case, Close Connection
function closeConnection() {
  db.end((error) => {
    if (error) {
      console.error("Error closing MySQL connection:", error);
      return;
    }
    console.log("MySQL connection closed.");
  });
}

// ? View Departments
function viewDepartments() {
  //? Define 'sql' within the function
  const sql = `SELECT * FROM neonatal_departments`;
  db.query(sql, (err, res) => {
    if (err) {
      console.log(err);
    }
    console.table(res);
    menu();
  });
}

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
// userActions constant
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

// When add Role, I was getting an error.
// "Field 'hourly' doesn't have a default value".
// Need to either:
// > 1. Define a default value for the hourly, so inserting a role will have a default (NOT IDEAL)
// > 2. Modify INSERT INTO query (BETTER), not sure if this would be harder for user to understand
// > 3. Prompt for the hourly rate. Less chance user to make mistakes. Need use Inquirer prompt.

// ! OG Do not mess with. This works
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

// TODO: CONSTRUCTION OF INQUIRER ROLE PROMPT //
// Using ? ? ? I assume because id is auto-incremented. It doesn't need to be set.
// function addRole() {
//   userActions.userAddRole().then((answers) => {
//     const sql =
//       "INSERT INTO roles (title, hourly, department_id) VALUES (?, ?, ?);";
//     // const values = [answers.title, answers.hourly, answers.department];
//     db.query(sql, answers, (err, res) => {
//       if (err) {
//         console.log("LOOOOOOOOOOOOOOK");
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

// > init()
// > menu (),
// > user chooses addRole()
// > questions.js
// > userActions.userAddRole() is prompted
// > inquirer prompt questions
// > RUNNING INTO HICCUP WITH DEPARTMENTCHOICES BECAUSE NOT AN INTEGER
//   > I need to figure out a way to use departmentChoices and reference the department_id to return an INTEGER
//   > OR do I need to restructure my const sql query to use neonatal_departments?

// TODO: Add Role
// TODO: > Prompted to enter name, salary, and department for added role...
// TODO: > role is added to database
// TODO: >
// TODO: >  TA:
// TODO: > Select * from department
// TODO: > set departmentNames be an empty string
// TODO: > for each department, push (on the end) department.names
// TODO: > state departmentName push to "Add new department"

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
          message: "Which Department is this new Role in?",
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

          response.forEach((newDepartment) => {
            if (roleData.departmentName === newDepartment.name) {
              departmentId = newDepartment.id;
            }
          });
          let sql = `INSERT INTO role (title, hourly, department_id) VALUES (?, ?, ?)`;
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

//   inquirer;
//   userActions.userAddRole().then((answers) => {
//     const sql =
//       "INSERT INTO roles (title, hourly, department_id) VALUES (?, ?, ?)";
//     const values = [answers.title, answers.hourly, answers.department_id];
//     db.query(sql, values, (err, res) => {
//       if (err) {
//         console.error("Error inserting role:", err);
//       } else {
//         console.table(res);
//       }
//       menu();
//     });
//   });
// });

// Fetch department
// * Try and look at using promise to return a new promise
// * https://javascript.info/promisify
// * promises MUST work with ASYNC functions
// async function getDepartments() {
//   try { this stuff
//   } catch (err) {
//     error handling
//   }
// }

// INSERT INTO roles (id, title, hourly, department_id) VALUES (?, ?, ?);

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
