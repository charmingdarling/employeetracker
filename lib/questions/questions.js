// Questions

const addDepartment = [
  {
    name: "addDepartment", // Can I just call this Department?
    type: "input",
    message: "What is the name of your department?",
    choices: [
      "Neonatal ICU",
      "Intermediate Care Nursery",
      "Newborn Well Baby",
      "Management",
    ],
  },
];

// const addRole = [
//   {
//     name: "addRole", // Can I just call this roll?
//     type: "list",
//     message: "What is the role of employee?",
//     choices: [
//       "Clinical Nurse II",
//       "Clinical Nurse III",
//       "Clinical Nurse IV",
//       "Clinical Nurse I, New Grad",
//       "Manager",
//     ],
//   },
// ];

const addEmployee = [
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
    choices: ["Clinical Nurse II",
    "Clinical Nurse III",
    "Clinical Nurse IV",
    "Clinical Nurse I, New Grad",
    "Manager",],
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
    choices: [
      85, 100, 105, 115
    ],
  },
  {
    name: "shift",
    type: "list",
    message: "Dayshift or Nightshift?",
    choices: ["dayshift", "nightshift"],
  },
];

const updateEmployeeRole = [
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
];

// Modularization of the variable questions, exporting the value of questions
module.exports = questions;
