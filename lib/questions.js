// Questions
const inquirer = require("inquirer");
const mysql = require("mysql2");
const { db } = require("../config/database");

// TODO: Prompted to enter:
// *TODO:  -- employee's first name,
// *TODO:  -- last name,
// TODO:  -- role,
// TODO:  -- >> Need to create a list of roles
// TODO:  -- >> -- >> Need to have function to empty array for choices?
// TODO:  -- and manager
// TODO:  -- >> Need to create a list of managers
// TODO:  -- >> -- >> Need to have function to empty array for choices?
// TODO: Employee added to database
//
//
// make function
// > go into database
// > create a choices array
// > add at correct place for useraddemployee (manager or role)

function userAddDepartment() {
  return inquirer.prompt([
    {
      name: "name",
      type: "input",
      message: "What is the name of your department?",
    },
  ]);
}

//! WORK HERE
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

// Modularization of the variable questions, exporting the value of questions
module.exports = {
  userAddDepartment,
  // userAddRole,
  // userAddEmployee,
};
