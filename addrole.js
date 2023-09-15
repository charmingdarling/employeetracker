const addRole = () => {
  const sql = "SELECT * FROM department";
  connection.query(sql, (error, response) => {
    if (error) throw error;
    let departmentName = [];
    response.forEach((department) => {
      departmentName.push(department.name);
    });
    departmentName.push("Create New Department");
    inquirer
      .prompt([
        {
          name: "departmentName",
          type: "list",
          message: "Which Department is this new Role in?",
          choices: departmentName,
        },
      ])
      .then((answer) => {
        if (answer.departmentName === "Create New Department") {
          this.addDepartment();
        } else {
          addNewRole(answer);
        }
      });
    const addNewRole = (departmentData) => {
      inquirer
        .prompt([
          {
            name: "newRole",
            type: "input",
            message: "What is the title of your new role?",
            validate: function (answer) {
              if (answer.length < 1) {
                return console.log("A valid Role title is required");
              }
              return true;
            },
          },
          {
            name: "salary",
            type: "input",
            message: "What is the Salary of this Role?",
            validate: function (answer) {
              if (answer.length < 1) {
                return console.log("A valid salary is required");
              }
              return true;
            },
          },
        ])
        .then((answer) => {
          let createdRole = answer.newRole;
          let departmentId;

          response.forEach((department) => {
            if (departmentData.departmentName === department.name) {
              departmentId = department.id;
            }
          });
          let sql = `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`;
          let crit = [createdRole, answer.salary, departmentId];

          connection.query(sql, crit, (error) => {
            if (error) throw error;
            console.log("Role Successfully Created");
            viewAllRoles();
          });
        });
    };
  });
};
