const mysql = require("mysql2");

class AskDatabase {
  databaseConnection = null; // the property of connection is initialized with the value of 'null'

  async createConnection() {
    AskDatabase.databaseConnection = mysql.createConnection(
      {
        host: "localhost",
        user: "root",
        password: "root",
        database: "nurses_db",
      },
      console.log("Established connection to database.")
    );
  }

  async closeConnection() {
    AskDatabase.databaseConnection.end((error) => {
      if (error) {
        console.error("Unable to close connection:", error);
        return;
      }
      console.log("Connection closed.");
    });
  }

  // //? Handle error to of query to sql
  // function databaseConnection() {
  //   let sql;
  //   // let answers;
  //   db.query(sql, (err, res) => {
  //     if (err) {
  //       console.log(err);
  //     }
  //     console.table(res);
  //     menu();
  //   });
  // }
}
// const { readFromFile, readAndAppend } = require("./helpers/fsUtils");
// module.exports = { readFromFile, writeToFile, readAndAppend };

// //? Keys - Connect to the database
// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "root",
//   database: "nurses_db",
// });

// //? Establish database connection and error
// db.connect((err) => {
//   if (err) {
//     console.error("Unable to connect to database:", err);
//   } else {
//     console.log(`Connected to the nurses_db database.`);
//   }
// });

module.exports = { AskDatabase };
