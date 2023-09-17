const inquirer = require("inquirer");
const mysql = require("mysql2");
const menu = require("menu");
const { AskDatabase } = require("../config/database");

class Cat {
  constructor(name, age, breed) {
    this.name = name;
    this.age = age;
    this.breed = breed;
  }
}

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
// function 'wait()' is scaled to return a new promise
const wait = () =>
  new Promise((resolve, reject) => {
    // a timeout of 3 seconds is initialized
    setTimeout(() => {
      // after 3 seconds a random number is generated
      const randNum = Math.floor(Math.random() * 100);
      // if the random number is even the 'resolve()' sends data through to the '.then()' of the promise
      if (randNum % 2 === 0) {
        resolve(`Success! Even number ${randNum} generated`);
        // if the random number is odd the 'reject()' sends data through to the the '.catch()' of the promise
      } else {
        reject(new Error(`Oops! Odd number ${randNum} generated`));
      }
    }, 3000);
  });

// execution of the 'wait()' function promise
wait()
  .then((res) => console.log(res))
  .catch((err) => console.log(err));

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

class Query {

  async queryViewDepartments(){
    const sql = ``
  }

}

  viewDepartments() {
    const sql = `SELECT * FROM neonatal_departments`;
    try {
      
    }
    pullQueryHandleError();
  }
}

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
