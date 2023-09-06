// Requiring these Node Package Manager Modules
const inquirer = require("inquirer");
const mysql = require("mysql2");

// Importing Scripts
const questions = require("./lib/questions");

// create the connection to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "company",
});

inquirer
  .prompt([
    /* Pass your questions in here */
  ])
  .then((answers) => {
    // Use user feedback for... whatever!!
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
