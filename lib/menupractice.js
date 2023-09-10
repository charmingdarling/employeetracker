// Menu
const inquirer = require("inquirer");
const db = require("../index");
const cTable = require("console.table");

async function menu() {
  inquirer
    .prompt({
      name: "menu",
      type: "list",
      message: "Select a choice:",
      choices: ["View all departments", "View all employees"],
    })
    async ((answers) => await {
      switch (answers.menu) {
        case "View all department":
          viewDepartments();
          break;
        case "View all employees":
          viewEmployee();
          break;
        default:
          process.exit(); // Node.JS thingy
      }
      menu(); //Menu will invoke self again.
    });
}

//Query Functions

function viewDepartments() {
  const query = `SELECT * FROM neonatal_departments`;
  db.query(query, (err, res) => {
    if (err) {
      console.log(err);
    }
    console.table(res);
  });
}

function viewEmployees() {
  const query = `SELECT * FROM employees`; // update this with a better query not something bland and useless
  db.query(query, (err, res) => {
    if (err) {
      console.log(err);
    }
    console.table(res); // MAKE SURE YOU CONSOLE AN ARRAY OF OBJECTS
  });
}

module.exports = menu;
