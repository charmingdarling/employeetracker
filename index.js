// Packages and Scripts needed for this app
const figlet = require("figlet");
const menu = require("./lib/menu");

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
