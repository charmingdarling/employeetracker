const mysql = require("mysql2");

// Connect to the database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "nurses_db",
});

// Log connection status
db.connect((error) => {
  if (error) {
    console.log("Unable to establish connection to database.", error);
    return;
  }
  console.log("Connection to database established.");
});

// Stop connection to the database
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
