// Requiring these Node Package Manager Modules
const inquirer = require("inquirer");
const mysql = require("mysql2");

// Importing Scripts
const questions = require("./lib/questions");

// Connect to database //!create separate file in db, configuration)
const db = mysql.createConnection(
  {
    host: "localhost", // MySQL username
    user: "root", // MySQL password
    password: "root",
    database: "nurses_db",
  },
  console.log(`Connected to the nurses_db database.`)
);

// Query database
db.query("SELECT * FROM nurses_db", function (err, results) {
  console.log(results);
});

//! questions prompted in new file

function init() {
  inquirer.prompt(menu);
}

async function init() {
  const answers = await inquirer.prompt();
  let department;
  // like shapes.js
  // functions - departments, update Employee Role, add Role, add
  // function "view all departments " -
  // show name and ids
  // function add a department
  // add name of department
}

// Function to initialize
init();

// inquirer
//   .prompt([
//     /* Pass your questions in here */
//   ])
//   .then((answers) => {
//     // Use user feedback for... whatever!!
//   })
//   .catch((error) => {
//     if (error.isTtyError) {
//       // Prompt couldn't be rendered in the current environment
//     } else {
//       // Something else went wrong
//     }
//   });
