// Menu
const inquirer = require("inquirer");
const db = require("index");

function menu() {
  inquirer.prompt(
    [
      {
    name: "menu",
    type: "list",
    message: "Select:",
    choices: [
      "View all departments",
      "View all employees",
      "View all roles",
      "Add a department",
      "Add a role",
      "Add an employee",
      "Update an employee role",
      "Add a manager",
    ],
  )
  .then((answers) => {
    switch(answers.menu) {
      case "View all departments":
        viewDepartments();
        break;
      case "View all employees":
        viewEmployee();
        break;
      case "View all roles":
        viewRole();
        break;
      case "Add a role":
        addDepartment();
        break;
      case "Add an employee":
        addEmployee();
        break;
      case "Update employee role":
        updateEmployeeRole();
        break;
      case "Add a manager":
        addManager();
        break;
      default: 
        process.exit(); // Node.JS thingy
  })
  };

  function viewDepartments() {
    const query = `SELECT * FROM neonatal_departments`;
    db.query(query, (err, res) => {
      if (err) {
        console.log(err);
      }
      console.table(res);
      menu();
    }); 
  }

  function viewEmployees() {
    const query = `SELECT * FROM neonatal_departments`;
    db.query(query, (err, res) => {
      if (err) {
        console.log(err);
      }
      console.table(res);
      menu();
    }); 
  }

  function viewRoles() {
    const query = `SELECT * FROM neonatal_departments`;
    db.query(query, (err, res) => {
      if (err) {
        console.log(err);
      }
      console.table(res);
      menu();
    }); 
  }

  function addDepartment() {
    const query = `SELECT * FROM neonatal_departments`;
    db.query(query, (err, res) => {
      if (err) {
        console.log(err);
      }
      console.table(res);
      menu();
    }); 
  }

  function addRoles() {
    const query = `SELECT * FROM neonatal_departments`;
    db.query(query, (err, res) => {
      if (err) {
        console.log(err);
      }
      console.table(res);
      menu();
    }); 
  }

  function addEmployee() {
    const query = `SELECT * FROM neonatal_departments`;
    db.query(query, (err, res) => {
      if (err) {
        console.log(err);
      }
      console.table(res);
      menu();
    }); 
  }

  function updateEmployee() {
    const query = `SELECT * FROM neonatal_departments`;
    db.query(query, (err, res) => {
      if (err) {
        console.log(err);
      }
      console.table(res);
      menu();
    }); 
  }

  function updateEmployeeRole() {
    const query = `SELECT * FROM neonatal_departments`;
    db.query(query, (err, res) => {
      if (err) {
        console.log(err);
      }
      console.table(res);
      menu();
    }); 
  }

  function addManager() {
    const query = `SELECT * FROM neonatal_departments`;
    db.query(query, (err, res) => {
      if (err) {
        console.log(err);
      }
      console.table(res);
      menu();
    }); 
  }

// # console.table - Allows us to access the table and portray which columns we have
// Left.join - allows us on the table that shows us every single employee

module.exports = menu;
