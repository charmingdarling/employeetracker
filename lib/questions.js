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
  // invoke the list of managers function here, place choices in 55
  await userGenerateRoleQuestion();
  const managerNames = await userGenerateManagerQuestion();
  // let managerNames = userGenerateManagerQuestion();
  // console.log("LINE 42", managerNames);

  // db.query(sql, (err, resp) => {
  //   if (err) {
  //     console.error("Error executing the query:", err);
  //   }
  //   // console.log("LINE 100", resp);
  //   // let managerNames = [];
  //   resp.forEach((newManager) => {
  //     managerNames.push(newManager);
  //   });
  // });
  // console.log(managerNames);
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
      name: "manager",
      type: "list",
      message: "Who is their manager?",
      choices: managerNames,
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

      return roleQuestion;
    });
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
// Generating the role choices
// const sql = `SELECT CONCAT (e.firstName, ' ', e.lastName) AS Manager_Name FROM employees e WHERE manager_id IS NULL;`;
// db.query(sql, (err, resp) => {
//   if (err) {
//     console.error("Error executing the query:", err);
//   }
//   // console.log("LINE 100", resp);
//   let managerNames = [];
//   resp.forEach((newManager) => {
//     managerNames.push(newManager);
//   });
// });
// db
// .promise()
// .query(
//   `SELECT CONCAT (e.firstName, ' ', e.lastName) AS Manager_Name FROM employees e WHERE manager_id IS NULL;`
// )
// .then(([roles]) => {
//   // console.log(roles);
//   // Now we are making the choices
//   const roleChoices = roles.map((role) => ({
//     name: role.title,
//     value: role.id,
//   }));
//   const roleQuestion = {
//     name: "role",
//     type: "list",
//     message: "What is their role?",
//     choices: roleChoices,
//   };
//       return roleQuestion;
// });
// }

// function generateRoleChoices() {
//   const listRoleChoices = [
//     // When we have this, it gives us a string. We want a NUMERIC value.
//     { name: "Manager", value: 1 },
//     { name: "Clinical Nurse I - New Grad", value: 2 },
//     { name: "Clinical Nurse II ", value: 3 },
//     { name: "Clinical Nurse III ", value: 4 },
//     { name: "Clinical Nurse IV ", value: 5 },
//   ];
//   return listRoleChoices; //passing choices back
// }

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
