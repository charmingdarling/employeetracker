// Questions

const inquirer = require("inquirer");

const userActions = {
  userAddDepartment() {
    return inquirer.prompt([
      {
        name: "name",
        type: "input",
        message: "What is the name of your department?",
      },
    ]);
  },

  // Function references > Function > Grabbing Department Data
  userAddRole() {
    return inquirer.prompt([{}]);
  },

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

  userAddEmployee() {
    return inquirer.prompt([
      {
        name: "firstName",
        type: "input",
        message: "What is the employee's first name?",
      },
      // {
      //   name: "lastName",
      //   type: "input",
      //   message: "What is the employee's last name?",
      // },
      // {
      //   name: "role",
      //   type: "list",
      //   choices: "What is their role?",
      // },
      // {
      //   name: "manager",
      //   type: "list",
      //   choices: "Who is their manager?",
      // },
    ]);
  },
}; // <-end of funciton

//   let addedEmployee = []
//   resp.forEach((newEmployee) => {
//     addedEmployee.push(newEmployee.manager_id)
//   })

//   return inquirer.prompt([
//     {
//       stuff
//     },
//   ]),
// },

// Modularization of the variable questions, exporting the value of questions
module.exports = userActions;
