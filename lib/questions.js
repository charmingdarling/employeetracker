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

// Function references > Function > Grabbing Department Data
function userAddRole() {
  return inquirer.prompt([{}]);
}
async function userAddEmployee() {
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
    await userGenerateRoleQuestion(),
    {
      name: "manager",
      type: "list",
      message: "Who is their manager?",
      choices: ["ABC"],
    },
  ];
  inquirer.prompt(questionsAddEmployee).then((answers) => {
    return answers;

    // const roleQuestion = await Menu.generateRoleQuestion();
    // questions.push(roleQuestion);
  });
}

function userGenerateRoleQuestion() {
  // Generating the role choices
  return db
    .promise()
    .query("SELECT id, title FROM roles")
    .then(([roles]) => {
      // console.log(roles);
      // Now we are making the choices
      const roleChoices = roles.map((role) => ({
        name: role.title,
        value: role.id,
      }));

      const roleQuestion = {
        name: "role",
        type: "list",
        message: "What is their role?",
        choices: roleChoices,
      };
      // const choices = [];
      // const roles = viewRoles();
      // roles.map((element) => {
      //   choices.push({ name: element.role, value: element.id });
      // });
      // roleQuestion.choices = choices;
      return roleQuestion;
    });
}

function generateRoleChoices() {
  const listRoleChoices = [
    // When we have this, it gives us a string. We want a NUMERIC value.
    { name: "Manager", value: 1 },
    { name: "Clinical Nurse I - New Grad", value: 2 },
    { name: "Clinical Nurse II ", value: 3 },
    { name: "Clinical Nurse III ", value: 4 },
    { name: "Clinical Nurse IV ", value: 5 },
  ];
  return listRoleChoices; //passing choices back
}

// static async displayAddEmployeeMenu() {
//   const questions = [
//       { type: 'input', name: 'firstName', message: 'What is the employee\'s first name?' },
//       { type: 'input', name: 'lastName', message: 'What is the employee\'s last name?' },
//   ];
//   const roleQuestion = await Menu.generateRoleQuestion();
//   questions.push(roleQuestion);
//   const managerQuestion = await Menu.generateManagerQuestion();
//   questions.push(managerQuestion);
//   const answers = await inquirer.prompt(questions);
//   return [answers.firstName, answers.lastName, answers.roleId, answers.managerId];
// }

// static async generateRoleQuestion() {
//   const question = {
//       type: 'list', name: 'roleId', message: 'What is the employee\'s role?'
//   }

//   const choices = [];
//   const roles = await Query.dbSelectAllRoles();
//   roles.forEach(element => {
//       choices.push({ name: element.role, value: element.id });
//   });
//   question.choices = choices;
//   return question;
// }

// static async generateManagerQuestion() {
//   const question = {
//       type: 'list', name: 'managerId', message: 'Who is the employee\'s manager?'
//   }
//   const choices = [{ name: 'None', value: null }];
//   const roles = await Query.dbSelectAllManagers();
//   roles.forEach(element => {
//       choices.push({ name: element.name, value: element.id });
//   });
//   question.choices = choices;
//   return question;
// }

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
module.exports = {
  userAddDepartment,
  userAddRole,
  userAddEmployee,
};
