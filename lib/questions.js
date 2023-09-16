// Questions
const inquirer = require("inquirer");
const mysql = require("mysql2");

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
        name: "role",
        type: "list",
        message: "What is their role?",
      },
      {
        name: "manager",
        type: "list",
        message: "Who is their manager?",
      },
    ];
    questionsAddEmployee[2].choices = generateRoleChoices();

    return inquirer.prompt(questionsAddEmployee);
  },
}; // <-end of funciton

// make function
// > go into database
// > create a choices array
// > add at correct place for useraddemployee (manager or role)

function generateRoleChoices() {
  const listRoleChoices = [
    { name: "Manager", value: 1, // When we have this, it gives us a string. We want a NUMERIC value.
    "Clinical Nurse I - New Grad",
    "Clinical Nurse II ",
    "Clinical Nurse III ",
    "Clinical Nurse IV ",
  ];
  return listRoleChoices; //passing choices back
}

// { name: 'View All Employees', value: 1 }, <- The way we need to format things so we can have inquirer to use this properly

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
