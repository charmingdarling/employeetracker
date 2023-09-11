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
        // TODO: Add other cases here....
        case "Close Program":
          closeConnection();
          break;
      }
    });
}

// ! Make an exitProgram function to get out of switch/case

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
    // Call menu without any arguments
    menu();
  });
}

function viewRoles() {
  const sql = `SELECT * FROM roles`;
  db.query(sql, (err, res) => {
    if (err) {
      console.log(err);
    }
    console.table(res);
    menu();
  });
}

//replace role_id with title
// Need to see employee IDs, first names, salaries, managers
function viewEmployees() {
  const sql = `SELECT * FROM employees`;
  db.query(sql, (err, res) => {
    if (err) {
      console.log(err);
    }
    console.table(res);
    menu();
  });
}

module.exports = menu;
