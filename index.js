// Packages needed for this app
const mysql = require("mysql2");
const figlet = require("figlet");

// Importing Scripts
const menu = require("./lib/menu");

// Connect to MySQL database, db is in a separate file 'nurses_db'
const db = mysql.createConnection({
  host: "localhost",
  user: "root", // MySQL username
  password: "root", // MySQL password
  database: "nurses_db", // Connecting to nurse database
});

// Establish database connection
db.connect((err) => {
  if (err) {
    console.error("Unable to connect to database:", err);
    return;
  } else {
    console.log(`Connected to the nurses_db database.`);
  }

  // Figlet to print out terminal "Employee Tracker" text
  figlet(` \n Nurse Tracker `, function (err, data) {
    if (err) {
      console.log("Something went wrong... Try something else.");
      console.dir(err);
      return;
    }
    console.log(data);
    // Call menu(); after Figlet displayed.
    init();
  });
});

//? The part below was in the activities/mini challenge, so does it do anything?

//? Query whole database
//? db.query("SELECT * FROM nurse_db", function (err, results) {
//?   console.log(results);
//? });

// Function to start menu.js. File prompts user with questions.

function init() {
  menu();
}

// Function to initialize
// Passing the 'db' object as an argument to the menu function
init(db);
