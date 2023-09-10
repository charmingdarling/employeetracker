// Packages needed for this app
const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");
const figlet = require("figlet");

// Importing Scripts
const questions = require("./lib/questions");
const menu = require("./lib/menu");
// require("dotenv").config();
// const menupractice = require("./lib/menupractice");

// Connect to database, db is in a separate file 'nurses_db'
// Conect to .env file
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root", // MySQL username
    password: "root", // MySQL password
    database: "nurses_db", // Connecting to nurse database
  },
  console.log(`Connected to the nurses_db database.`)
);

// Query whole database
db.query("SELECT * FROM nurse_db", function (err, results) {
  console.log(results);
});

// Figment to print out terminal "Employee Tracker" text
figlet(` \n Nurse Tracker `, function (err, data) {
  if (err) {
    console.log("Something went wrong... Try something else.");
    console.dir(err);
    return;
  }
  console.log(data);
});

// Function to start menu.js. Menu.js has questions prompt for user.
//Imported/required const above.
function init() {
  // menupractice();
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
