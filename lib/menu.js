//? Menu
const inquirer = require("inquirer");
const mysql = require("mysql2");
const userActions = require("./questions");
const { db, closeConnection } = require("../config/database");

// * Connecting to database using answers as a value.

function databaseConnection() {
  let sql;
  let answers;
  // db.query(sql, answers, (err, res) => {
  db.query(sql, (err, res) => {
    if (err) {
      console.log(err);
    }
    console.table(res);
    menu();
  });
}

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
          userAddEmployee();
          break;
        case "Update an employee":
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

function userGenerateRoleQuestion() {
  // Generating the role choices
  return db
    .promise()
    .query("SELECT id, title FROM roles")
    .then(([roles]) => {
      // console.log(roles);
      // Now we are making the choices
      const roleChoices = roles.map((role) => ({
        name: role.title,
        value: role.id,
      }));

      const roleQuestion = {
        name: "role",
        type: "list",
        message: "What is their role?",
        choices: roleChoices,
      };

      return roleQuestion;
    });
}

// ? "Add an employee"

// ! Trying to rework the function with SELECT * FROM for sql

async function addEmployee() {
  const answers = await userActions.userAddEmployee();
  // console.log(answers);
}

async function userAddEmployee() {
  // invoke the list of managers function here, place choices in 55
  await userGenerateRoleQuestion();
  const managerNames = await userGenerateManagerQuestion();
  // let managerNames = userGenerateManagerQuestion();
  // console.log("LINE 42", managerNames);

  // db.query(sql, (err, resp) => {
  //   if (err) {
  //     console.error("Error executing the query:", err);
  //   }
  //   // console.log("LINE 100", resp);
  //   // let managerNames = [];
  //   resp.forEach((newManager) => {
  //     managerNames.push(newManager);
  //   });
  // });
  // console.log(managerNames);
  const questionsAddEmployee = [
    {
      name: "firstName",
      type: "input",
      message: "What is the employee's first name?",
    },
    {
      name: "lastName",
      type: "input",
      message: "What is the employee's last name?",
    },

    {
      name: "manager",
      type: "list",
      message: "Who is their manager?",
      choices: managerNames,
    },
  ];

  inquirer.prompt(questionsAddEmployee).then((answers) => {
    menu();
    return answers;
    // const roleQuestion = await Menu.generateRoleQuestion();
    // questions.push(roleQuestion);
  });
}

async function userGenerateManagerQuestion() {
  const managerNames = [];
  const sql = `SELECT CONCAT(e.firstName, ' ', e.lastName) AS Manager_Name FROM employees e WHERE manager_id IS NULL;`;

  // Wrap the database query in a Promise
  const queryPromise = new Promise((resolve, reject) => {
    db.query(sql, (err, resp) => {
      if (err) {
        console.error("Error executing the query:", err);
        reject(err);
      } else {
        resp.forEach((newManager) => {
          managerNames.push(newManager.Manager_Name);
        });
        resolve(managerNames); // Resolve with the managerNames array
      }
    });
  });

  // Wait for the database query to complete before resolving with managerNames
  return await queryPromise;
}

// // ? Add Department
// // userActions is a constant from questions.js
// function addEmployee() {
//   userActions.userAddEmployee().then((answers) => {
//     const sql = `INSERT INTO neonatal_departments SET ?`;
//     db.query(sql, answers, (err, res) => {
//       if (err) {
//         console.log(err);
//       }
//       console.table(res);
//       menu();
//     });
//   });
// }

async function updateEmployee() {}

module.exports = menu;
