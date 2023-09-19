const inquirer = require("inquirer");
const mysql = require("mysql2");
const { menu } = require("menu");
const { AskDatabase } = require("../config/database");

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

module.exports = { query };
