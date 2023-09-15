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

  // ! I have an error in my SQL syntax.
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
        message: "What is the employee's first name?"
      },
      {
        name: "lastName",
        type: "input",
        message: "What is the employee's last name?"
      },
      {
        name: "role",
        type: "list",
        choices: "What is their role?"
      },
      {
        name: "manager",
        type: "list",
        choices: "Who is their manager?"
      },
    ])
    userActions.userAddEmployee().then((answers) => {
      const sql = `INSERT INTO employees SET`;
      db.query(sql, answers, (err, res) => {
        if (err) {
          console.log(err);
        }
        console.table(res);
        menu();
      });
    })


    let addedEmployee = []
    resp.forEach((newEmployee) => {
      addedEmployee.push(newEmployee.manager_id)
    })

    return inquirer.prompt([
      {
        stuff
      },
    ]),
  },
  // const userAddEmployee = [
  //   {
  //     name: "addRole", // Can I just call this roll?
  //     type: "list",
  //     message: "What is the role of employee?",
  choices: [
    "Clinical Nurse II",
    "Clinical Nurse III",
    "Clinical Nurse IV",
    "Clinical Nurse I, New Grad",
    "Manager",
  ],
  //   },
  // ];

  addEmployee: [
    {
      name: "firstName",
      type: "input",
      message: "Please enter employee's first name.",
    },
    {
      name: "lastName",
      type: "input",
      message: "Please enter employee's last name.",
    },
    {
      name: "role",
      type: "list",
      message: "Please enter employee's role.",
      choices: [
        "Clinical Nurse II",
        "Clinical Nurse III",
        "Clinical Nurse IV",
        "Clinical Nurse I, New Grad",
        "Manager",
      ],
    },
    {
      name: "manager",
      type: "list",
      message: "Please enter manager.",
      choices: [
        "Sergio Vidales-Perez",
        "Grace Nelson",
        "Susan Wheeler",
        "Florence Nightingale",
      ],
    },
    {
      name: "hourly",
      type: "list",
      message: "Please enter hourly rate.",
      choices: [85, 100, 105, 115],
    },
    {
      name: "shift",
      type: "list",
      message: "Dayshift or Nightshift?",
      choices: ["dayshift", "nightshift"],
    },
  ],

  updateEmployeeRole: [
    {
      name: "updateEmployee", // Can I just call this Department?
      type: "input",
      message: "Which employee do you want to choose to update?",
    },
    {
      name: "updateEmployeeRole", // Can I just call this Department?
      type: "input",
      message: "Which role will they now have?",
      choices: ["Clinical Nurse II", "Clinical Nurse III", "Clinical Nurse IV"],
    },
  ],
};
// Modularization of the variable questions, exporting the value of questions
module.exports = userActions;
