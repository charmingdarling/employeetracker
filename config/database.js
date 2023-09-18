const mysql = require("mysql2");

//? Connect to the database

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "root",
    database: "nurses_db",
  },
  console.log("Established connection to database.")
);

//? Stop connection to the database
function closeConnection() {
  db.end((error) => {
    if (error) {
      console.error("Unable to close connection:", error);
      return;
    }
    console.log("Connection closed.");
  });
}

module.exports = { db, closeConnection };
