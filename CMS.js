// dependencies needed
// require mysql
var mysql = require("mysql");
// require inquirer
var inquirer = require("inquirer");
// require console.table npm
var console = require("console.table");

// define connection as mysql's createConnection method
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 8113
  port: process.env.PORT || 8113,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "cms_db"
});

// using mysql's connect method- create a connection to the server
connection.connect(function(err) {
  // if the connection does not work, terminate the program
  //if (err) throw err;
  // if the connection does work, console log the message below
  //console.log("connected as id " + connection.threadId + "\n");
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
  // console log the message below
  console.log("Creating a new department \n");
  // define variable query as the mysql method to establish a connection to the server
  var query = connection.query(
    // insert a new department with the given information
    "INSERT INTO department SET ?",
    // define an error function
    function(error, response){
      // if there is an error, stop the program
      if (error) throw error;
      // if successful, console log the message below
      console.log(response.affectedRows + " department created \n");
      // call start function to run through task options again
     });
};

function addRole(){
  console.log("Creating a new role \n");
  var query = connection.query(
    "INSERT INTO role SET ?",
    // define an error function
    function(error, response){
      // if there is an error, stop the program
      if (error) throw error;
      // if successful, console log the message below
      console.log(response.affectedRows + " role created \n");
    });
};

function addEmployee(){
  console.log("Creating a new role \n");
  var query = connection.query(
    "INSERT INTO employee SET ?",
    // define an error function
    function(error, response){
      // if there is an error, stop the program
      if (error) throw error;
      // if successful, console log the message below
      console.log(response.affectedRows + " employee created \n");
    });
};

function viewDepartment(){
  console.log("Selecting all departments \n");
  var query = connection.query(
    "SELECT * FROM department", 
    function(error, response) {
      if (error) throw error;
      // Log all results of the SELECT statement
      console.table(response);
    });
};

function viewRole(){
  console.log("Selecting all roles \n");
  var query = connection.query(
    "SELECT * FROM role", 
    function(error, response) {
      if (error) throw error;
      // Log all results of the SELECT statement
      console.table(response);
    });
};

function viewEmployee(){
  console.log("Selecting all employees \n");
  var query = connection.query(
    "SELECT * FROM employee", 
    function(error, response) {
      if (error) throw error;
      // Log all results of the SELECT statement
      console.table(response);
    });
};

function updateEmployee(){
  console.log("Updating employee information \n");
  var query = connection.query(
    "UPDATE employee SET ? WHERE ?",
    function(error, response){
    // if there is an error, stop the program
      if (error) throw error;
      // if successful, console log the message below
      console.log(response.affectedRows + " employee information updated \n");
    });
};

