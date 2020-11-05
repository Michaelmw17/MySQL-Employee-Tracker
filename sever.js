const mysql = require('mysql');
const inquirer = require('inquirer');

var connection = mysql.createConnection({
    multipleStatements: true, 
    host: "localhost",
   /*port*/
    port: 3306,
   /*user name*/
    user: "root",

    /*password*/
    password: "Mw080398!",
    database: "employee_db"
  });

connection.connect(function(err){
    if (err) throw err;
    start();

});

  function start() {
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
      .then(function(answer){
         
      })

      function viewDepartments() {

      }

      function viewRoles () {

      }

function viewEmployees() {

}

function addDepartment() {

}

function addRole() {

}

async function addEmployee() {

}

function updateRole {

}

