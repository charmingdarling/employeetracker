const inquirer = require("inquirer");
const mysql = require("mysql2");
const menu = require("menu");
const { AskDatabase } = require("../config/database");

// //? Handle error to of query to sql
// function databaseConnection() {
//   let sql;
//   let answers;
//   db.query(sql, (err, res) => {
//     if (err) {
//       console.log(err);
//     }
//     console.table(res);
//     menu();
//   });
// }

// 10 - OOP, Activity 25 - Lesson: new Promise

class QueryDatabase {
  // Taken from database.js of AskDatabase Class to connect to database
  constructor(databaseConnection) {
    this.databaseConnection = databaseConnection; // Declaring connection to database
  }

  pullQueryHandleError(sql, answers) {
    return newPromise((resolve, reject) => {
      this.databaseConnection.query(sql, answers, (error, response) => {
        if (error) {
          reject(console.log("Error. Unable to pull from database.", error));
        } else {
          resolve(console.table(answers));
          menu();
        }
      });
    });
  }

  async queryViewDepartments() {
    const sql = `SELECT * FROM neonatal_departments;`;
    const result = await AskDatabase.databaseConnection.promise().query(sql);
    return result;
  }
}

//   viewDepartments() {
//     const sql = `SELECT * FROM neonatal_departments`;
//     try {

//     }
//     pullQueryHandleError();
//   }
// }

// function viewDepartments() {
//   //? Define 'sql' within the function
//   const sql = `SELECT * FROM neonatal_departments`;
//   db.query(sql, (err, res) => {
//     if (err) {
//       console.log(err);
//     }
//     console.table(res);
//     menu();
//   });
// }

module.exports = { query };
