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
});

// Function to start menu.js. File prompts user with questions.
// Need async for printBanner();
async function printBanner() {
  console.log("Nurse Tracker should be printed");
  try {
    const result = await figletAsync("Nurse Tracker"); //Need await
    console.log(result);
  } catch (err) {
    console.log("Something went wrong...");
    console.dir(err);
  }
}

function figletAsync(text) {
  return new Promise((resolve, reject) => {
    figlet(text, (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(data);
    });
  });
}

async function init() {
  await printBanner(); // Need function init() to be async so that await printBanner works.
  menu();
}

// Function to initialize
init();
