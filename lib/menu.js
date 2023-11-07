//? Menu
const inquirer = require("inquirer");
const mysql = require("mysql2");
const userActions = require("./questions");
const { db, closeConnection } = require("../config/database");

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
      console.error("Error getting departments.", err);
    } else {
      console.table(res);
    }
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
      console.error("Error viewing roles.", err);
    } else {
      console.table(res);
    }
    menu();
  });
}

function formatTable(data) {
  data.forEach((item) => {
    console.log("ID: ");
  });
}

// ? View All Employees
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
      console.error("Error viewing employees.", err);
    } else {
      console.table(res);
    }
    menu();
  });
}

// ? Add Department
// userActions is a constant from questions.js
function addDepartment() {
  userActions.userAddDepartment().then((answers) => {
    const insertSql = `INSERT INTO neonatal_departments SET ?`;
    db.query(insertSql, answers, (err, res) => {
      if (err) {
        console.error("Error adding department.", err);
        menu();
        return;
      }

      if (!err) {
        const selectSql = "SELECT * FROM neonatal_departments WHERE id = ?";
        db.query(selectSql, [res.insertId], (selectErr, selectRes) => {
          if (selectErr) {
            console.log("Error adding department:", selectErr);
          } else {
            console.log("Department added.");
            console.table(selectRes);
          }
          menu();
        });
      }
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
  });
}

function addRole() {
  const sql = "SELECT * FROM neonatal_departments";
  db.query(sql, (err, resp) => {
    if (err) {
      console.error("Error executing the query:", err);
    }

    let departmentNames = resp.map((newDepartment) => newDepartment.name);
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
          addNewRole(answer, resp);
        }
      });
  });
}

function addNewRole(roleData, departments) {
  inquirer
    .prompt([
      {
        name: "newTitle",
        type: "input",
        message: "What is your new role called?",
        validate: function (answer) {
          return answer.length >= 1 || "Please enter a valid title.";
        },
      },
      {
        name: "hourly",
        type: "input",
        message: "What is the hourly pay of this role?",
        validate: function (answer) {
          return answer.length >= 1 || "Please enter a valid hourly pay.";
        },
      },
    ])
    .then((answer) => {
      const addedRole = answer.newTitle;
      let departmentId;

      departments.forEach((newDepartment) => {
        if (roleData.departmentName === newDepartment.name) {
          departmentId = newDepartment.id;
        }
      });

      const sql = `INSERT INTO roles (title, hourly, department_id) VALUES (?, ?, ?)`;
      const criteria = [addedRole, answer.hourly, departmentId];

      db.query(sql, criteria, (err, res) => {
        if (err) {
          console.error(err);
        }
        console.table(res);
        menu();
      });
    });
}

function userGenerateRoleQuestion() {
  // Generating the role choices
  return db
    .promise()
    .query("SELECT id, title FROM roles")
    .then(([roles]) => {
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
async function addEmployee() {
  const answers = await userActions.userAddEmployee();
  // console.log(answers);
}

async function userAddEmployee() {
  // invoke the list of managers function here, place choices in 55
  await userGenerateRoleQuestion();
  const managerNames = await userGenerateManagerQuestion();
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
    // Extract answers
    const { firstName, lastName, manager_id } = answers;

    // Construct an SQL INSERT statement
    const sql =
      "INSERT INTO employees (firstName, lastName, manager_id) VALUES (?, ?, ?)";
    const values = [firstName, lastName, manager_id]; // Replace with actual column names and values.

    // Execute the SQL INSERT statement
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error("321 Error adding employee:", err);
      } else {
        console.log("323 - Employee added successfully.", result);
      }
      menu();
    });
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

async function updateEmployee() {}

module.exports = menu;
