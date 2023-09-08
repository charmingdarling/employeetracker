// Requiring these Node Package Manager Modules
const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");
const figlet = require("figlet");

// Importing Scripts
const questions = require("./lib/questions");
const menu = require("./lib/menu");

// Connect to database
//!^---create separate file in db, configuration)
const db = mysql.createConnection(
  {
    host: "localhost", // MySQL username
    user: "root", // MySQL password
    password: "root",
    database: "nurses_db", // Connecting to nurse database
  },
  console.log(`Connected to the nurses_db database.`)
);

// Query database
db.query("SELECT * FROM employees", function (err, results) {
  console.log(results);
});

// Figment to print out Employee
figlet("Neonatal Nurse Employee Tracker!!", function (err, data) {
  if (err) {
    console.log("Something went wrong...");
    console.dir(err);
    return;
  }
  console.log(data);
});

//! questions prompted in new file

// async function doSomething(){
//   let response = await fetch(url);
//   return response
// }

// Function to start menu.js. Imported/required const above.
function init() {
  menu();
}

// Function to initialize
init();

// like shapes.js
// functions - departments, update Employee Role, add Role, add
// function "view all departments " -
// show name and ids
// function add a department
// add name of department
