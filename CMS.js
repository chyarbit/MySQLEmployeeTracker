// dependencies needed
// require mysql
var mysql = require("mysql");
// require inquirer
var inquirer = require("inquirer");
// require console.table npm
var cTable = require("console.table");

// define connection as mysql's createConnection method
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: process.env.PORT || 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "cms_db"
});

// using mysql's connect method- create a connection to the server
connection.connect(function(err) {
  // if the connection does not work, terminate the program
  if (err) throw err;
  // if the connection does work, console log the message below
  console.log("connected as id " + connection.threadId + "\n");
  // call function start
  start();
});

// define constant questions for the inquirer prompt
const questions = [
  {
    type: "rawlist",
    message: "What would you like to do?",
    choices: 
        [
          "View departments",
          "View roles",
          "View employees",
          "Add department",
          "Add role",
          "Add employee",
          "Update employee",
          "Exit the program"
        ],
    name: "task"
  },
]

// define a function called Start to start the program
function start(){
// use inquirer
inquirer
// using inqirer's prompt method and feed in the the constant questions
.prompt(questions)
// use .then promise method with the answers parameter
.then(function(answers){
  //use a switch case function and feed in the answer received from the start function
  switch(answers.task){
    case "View departments":
      viewDepartment();
    break

    case "View roles":
      viewRole();
    break

    case "View employees":
      viewEmployee();
    break

    case "Add department":
      addDepartment();
    break

    case "Add role":
      addRole();
    break

    case "Add employee":
      addEmployee();
    break

    case "Update employee":
      updateEmployee();
    break

    case "Exit the program":
      return 
  };
});
};

// create function createDepartment
function addDepartment(){
  inquirer
  .prompt(
    [{
      type: "input",
      message: "Please enter the id number of the new department",
      name: "deptId"
    },
    {
      type: "input",
      message: "Please enter name of the new department",
      name: "deptName"
    }],
  )
 .then(function({deptId, deptName}){
   // define variable query as the mysql method to establish a connection to the server
  connection.query(
    // insert a new department with the given information
    "INSERT INTO department SET ?",
    {
      id: deptId,
      name: deptName
    },
    // define an error function
    function(error, response){
      // if there is an error, stop the program
      if (error) throw error;
      // if successful, console log the message below
      console.log(response.affectedRows + " department created \n");
      // call start function to run through task options again
      start(); 
    })
  });
};

function addRole(){
  inquirer
  .prompt(
    [{
      type: "input",
      message: "Please enter the id number of the new role",
      name: "roleId"
    },
    {
      type: "input",
      message: "Please enter the title for the new role",
      name: "roleTitle"
    },
    {
      type: "input",
      message: "Please enter the salary for the new role",
      name: "roleSalary"
    },
    {
      type: "input",
      message: "Please enter the department id for the new role",
      name: "roleDeptId"
    }],
  )
  .then(function({roleId, roleTitle, roleSalary, roleDeptId}){
    // define variable query as the mysql method to establish a connection to the server
  connection.query(
    "INSERT INTO role SET ?",
    {
      id: roleId,
      title: roleTitle,
      salary: roleSalary,
      department_id: roleDeptId
    },
    // define an error function
    function(error, response){
      // if there is an error, stop the program
      if (error) throw error;
      // if successful, console log the message below
      console.log(response.affectedRows + " role created \n");
      start();
    });
  });
};

function addEmployee(){
  inquirer
  .prompt(
    [{
      type: "input",
      message: "Please enter the first name of the new employee",
      name: "empFirstName"
    },
    {
      type: "input",
      message: "Please enter the last name of the new employee",
      name: "empLastName"
    },
    {
      type: "input",
      message: "Please enter the role id for the new employee",
      name: "empRoleId"
    },
    {
      type: "input",
      message: "Please enter the manager id for the new employee",
      name: "empMgrId"
    }],
  )
  .then(async function({empFirstName, empLastName, empRoleId, empMgrId}){
  connection.query(
    "INSERT INTO employee SET ?",
    {
      first_name: empFirstName,
      last_name: empLastName, 
      role_id: empRoleId,
      manager_id: empMgrId
    },
    // define an error function
    function(error, response){
      // if there is an error, stop the program
      if (error) throw error;
      // if successful, console log the message below
      console.log(response.affectedRows + " employee created \n");
      start();
    });
});
};

function viewDepartment(){
  connection.query(
    "SELECT * FROM department", 
    function(error, response) {
      if (error) throw error;
      // Log all results of the SELECT statement
      console.table(response);
      start();
    });
};

function viewRole(){
  connection.query(
    "SELECT * FROM role", 
    function(error, response) {
      if (error) throw error;
      // Log all results of the SELECT statement
      console.table(response);
      start();
    });
};

function viewEmployee(){
  connection.query(
    "SELECT * FROM employee", 
    function(error, response) {
      if (error) throw error;
      // Log all results of the SELECT statement
      console.table(response);
      start();
    });
};

function updateEmployee(){
  viewEmployee();
  inquirer
  .prompt(
    [
      {
      type: "rawlist",
      message: "What would you like to update?",
      choices: [
        "Employee's First Name", 
        "Employee's Last Name", 
        "Employee's Role Id",
        "Employee's Manager's Role Id"],
      name: "updateEmpChoice"
    },
    {
      type: "input",
      message: "Please enter the updated first name of the employee",
      name: "updateEmpFirstName",
      when: function(answers){
        return answers.updateEmpChoice === "Employee's First Name";
      }
    },
    {
      type: "input",
      message: "Please enter the updated last name of the employee",
      name: "updateEmpLastName",
      when: function(answers){
        return answers.updateEmpChoice === "Employee's Last Name";
      }
    },
    {
      type: "input",
      message: "Please enter the updated role id for the employee",
      name: "updateEmpRoleId",
      when: function(answers){
        return answers.updateEmpChoice === "Employee's Role Id";
      }
    },
    {
      type: "input",
      message: "Please enter the updated manager id for the  employee",
      name: "updateEmpMgrId",
      when: function(answers){
        return answers.updateEmpChoice === "Employee's Manager's Role Id";
      }
    }],
  )
  .then(function(answers){
    switch(answers.updateEmpChoice){
      case "Employee's First Name":
        connection.query(
        "UPDATE employee SET ? WHERE ?",
        {
          first_name: updateEmpFirstName,
        },        
        {
          first_name: updateEmpFirstName,
        },
          function(error, response){
          // if there is an error, stop the program
            if (error) throw error;
            // if successful, console log the message below
            console.log(response.affectedRows + " employee information updated \n");
            start();
          });
    }
  
});
};

