const mysql = require("mysql2");

//? Connect to MySQL database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "nurses_db",
});

//? Establish database connection
db.connect((err) => {
  if (err) {
    console.error("Unable to connect to database:", err);
  } else {
    console.log(`Connected to the nurses_db database.`);
  }
});

function databaseConnection() {
  db.query(sql, answers, (err, res) => {
    if (err) {
      console.log(err);
    }
    console.table(res);
    menu();
  });
}

module.exports = connect;
