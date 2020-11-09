const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');

const logo = require('asciiart-logo');
const config = require('./package.json');
console.log(logo(config).render());

const longText = '';
 
console.log(
    logo({
        name: 'Add  a department, role or an employee.',
        font: 'Speed',
        lineChars: 10,
        padding: 2,
        margin: 3,
        borderColor: 'grey',
        logoColor: 'bold-green',
        textColor: 'green',
    })
    .emptyLine()
    .right('version 3.7.123')
    .emptyLine()
    .center(longText)
    .render()
);

const connection = mysql.createConnection({
    multipleStatements: true, 
    host: "localhost",

    // Port
    port: 3306,
  
    // Username
    user: "root",
  
    // Password
    password: "",
    database: "employee_db"
  });

  
  connection.connect((err) => {
    if (err) throw err;
    start();
  });

   const start = () => {
    inquirer
      .prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update employee role",
          "Exit"
        ]
      })
    .then((answer) => {
        if (answer.action === 'View all departments') {
            viewDepartments();
        } else if (answer.action === 'View all roles') {
            viewRoles();
        } else if (answer.action === 'View all employees') {
            viewEmployees();
        } else if (answer.action === 'Add a department') {
            addDepartment();
        } else if (answer.action === 'Add a role') {
            addRole();
        } else if (answer.action === 'Add an employee') {
            addEmployee();
        } else if (answer.action === 'Update employee role') {
            updateRole();
        } else if (answer.action === 'Remove  employee role') {
            removeRole();
        }
        else if (answer.action === 'Exit') {
            connection.end();
        }
    })
    }
        const viewDepartments = () => {
          const  query = "SELECT * FROM department";
        connection.query(query, (err, res) => {
            console.log(`DEPARTMENTS:`)
        res.forEach(department => {
            console.log(`ID: ${department.id} | Name: ${department.name}`)
        })
        start();
        });
    };

        const viewRoles = () => {
        const  query = "SELECT * FROM role";
        connection.query(query, (err, res) => {
            console.log(`ROLES:`)
        res.forEach(role => {
            console.log(`ID: ${role.id} | Title: ${role.title} | Salary: ${role.salary} | Department ID: ${role.department_id}`);
        })
        start();
        });
    };

    const viewEmployees = () => {
    const query = "SELECT * FROM employee";
        connection.query(query, (err, res) => {
            console.log(`EMPLOYEES:`)
        res.forEach(employee => {
            console.log(`ID: ${employee.id} | Name: ${employee.first_name} ${employee.last_name} | Role ID: ${employee.role_id} | Manager ID: ${employee.manager_id}`);
        });
        start();
        });
};

    const addDepartment = () => {
    inquirer
    .prompt({
        name: "department",
        type: "input",
        message: "What is the name of the new department?",
    })
    .then((answer)=> {
    const query = "INSERT INTO department (name) VALUES ( ? )";
    connection.query(query, answer.department,  (err, res) => {
        console.log(`You have added this department: ${(answer.department).toUpperCase()}.`)
    });
    viewDepartments();
    });
};

    const addRole = () => {
    connection.query('SELECT * FROM department', (err, res) => {
        if (err) throw (err);
    inquirer
        .prompt([{
            name: "title",
            type: "input",
            message: "What is the title of the new role?",
        }, 
        {
            name: "salary",
            type: "input",
            message: "What is the salary of the new role?",
        },
        {
            name: "departmentName",
            type: "list",
            message: "Choose department does this role falls under?",
            choices: () => {
                const choicesArray = [];
                res.forEach(res => {
                    choicesArray.push(
                        res.name
                    );
                })
                return choicesArray;
            }
        }
        ])
// To get the id here, i need a way to grab it from the departments table 
        .then((answer) => {
        const department = answer.departmentName;
        connection.query('SELECT * FROM DEPARTMENT', (err, res) => {
        
            if (err) throw (err);
            let filteredDept = res.filter((res) => {
            return res.name == department;
        }
        )
        let id = filteredDept[0].id;
        let query = "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)";
        let values = [answer.title, parseInt(answer.salary), id]
        console.log(values);
        connection.query(query, values,
            (err, res, fields) => {
            console.log(`You have added this role: ${(values[0]).toUpperCase()}.`)
        });
            viewRoles();
            });
        });
    });
};

const addEmployee = () => {
    connection.query('SELECT * FROM role', (err, result) => {
        if (err) throw (err);
    inquirer
        .prompt([{
            name: "firstName",
            type: "input",
            message: "What is the employee's first name?",
        }, 
        {
            name: "lastName",
            type: "input",
            message: "What is the employee's last name?",
        },
        {
            name: "roleName",
            type: "list",
            message: "What role does the employee have?",
            choices: () => {
                rolesArray = [];
                result.forEach(result => {
                    rolesArray.push(
                        result.title
                    );
                })
                return rolesArray;
            }
        }
        ]) 
// in order to get the id here, i need a way to grab it from the departments table 
        .then((answer)=> {
        console.log(answer);
        const role = answer.roleName;
        connection.query('SELECT * FROM role', (err, res) => {
            if (err) throw (err);
            let filteredRole = res.filter((res) => {
                return res.title == role;
            })
        let roleId = filteredRole[0].id;
        connection.query("SELECT * FROM employee",  (err, res) => {
                inquirer
                .prompt ([
                    {
                        name: "manager",
                        type: "list",
                        message: "Who is your manager?",
                        choices: () => {
                            managersArray = []
                            res.forEach(res => {
                                managersArray.push(
                                    res.last_name)
                            })
                            return managersArray;
                        }
                    }
                ]).then((managerAnswer) => {
                    const manager = managerAnswer.manager;
                connection.query('SELECT * FROM employee', (err, res) =>{
                if (err) throw (err);
                let filteredManager = res.filter((res) => {
                return res.last_name == manager;
            })
            let managerId = filteredManager[0].id;
                    console.log(managerAnswer);
                    let query = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";
                    let values = [answer.firstName, answer.lastName, roleId, managerId]
                    console.log(values);
                    connection.query(query, values,
                        (err, res, fields) => {
                        console.log(`You have added this employee: ${(values[0]).toUpperCase()}.`)
                        });
                        viewEmployees();
                        });
                    });
                });
            });
        });
    });
};

    const updateRole= () => {
    connection.query('SELECT * FROM employee', (err, result) => {
        if (err) throw (err);
        inquirer
        .prompt([
        {
            name: "employeeName",
            type: "list",
            message: "Which employee's role is changing?",
            choices: () => {
                employeeArray = [];
                result.forEach(result => {
                    employeeArray.push(
                        result.last_name
                    );
                })
                return employeeArray;
            }
        }
        ]) 
//to retrieve the id here,  retrieve it from the departments table 
        .then((answer) => {
        console.log(answer);
        const name = answer.employeeName;
        connection.query("SELECT * FROM role", (err, res) => {
                inquirer
                .prompt ([
                    {
                        name: "role",
                        type: "list",
                        message: "What is their new role?",
                        choices: () => {
                            rolesArray = [];
                            res.forEach(res => {
                                rolesArray.push(
                                    res.title)
                                
                            })
                            return rolesArray;
                        }
                    }
                ]).then((rolesAnswer) => {
                    const role = rolesAnswer.role;
                    console.log(rolesAnswer.role);
                connection.query('SELECT * FROM role WHERE title = ?', [role], (err, res) => {
                if (err) throw (err);
                    let roleId = res[0].id;
                    let query = "UPDATE employee SET role_id ? WHERE last_name ?";
                    let values = [roleId, name]
                    console.log(values);
                    connection.query(query, values,
                        (err, res, fields) => {
                        console.log(`You have updated ${name}'s role to ${role}.`)
                        });
                        viewEmployees();
                        });
                    });
                });
            });
        });
    };
