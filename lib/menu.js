// Menu
const inquirer = require("inquirer");
const mysql = require("mysql2");

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
    return;
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
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a role",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update a role",
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
          viewRoles();
          break;
        // Add other cases here....
        default:
          process.exit(); // Node.js thingy
      }
    });
}

function viewDepartments() {
  const sql = `SELECT * FROM neonatal_departments`; // Define 'sql' within the function
  db.query(sql, (err, res) => {
    if (err) {
      console.log(err);
    }
    console.table(res);
    menu(); // Call menu without any arguments
  });
}

function viewEmployees() {
  const sql = `SELECT * FROM employees`; // Define 'sql' within the function
  db.query(sql, (err, res) => {
    if (err) {
      console.log(err);
    }
    console.table(res);
    menu(); // Call menu without any arguments
  });
}

function viewRoles() {
  const sql = `SELECT * FROM roles`; // Define 'sql' within the function
  db.query(sql, (err, res) => {
    if (err) {
      console.log(err);
    }
    console.table(res);
    menu(); // Call menu without any arguments
  });
}

module.exports = menu;
