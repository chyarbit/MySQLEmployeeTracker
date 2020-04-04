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
  port: 8113,

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
  // call function createDepartment
  addDepartment();
});

// when user runs program, prompted to select an action
  // view department
  // view roles
  // view employees
  // add department
  // add role
  // add employee
  // update employee

  // define a function called Start to start the program
  function start(){
  // define constant questions for the inquirer prompt
  const questions = [
    {
        type: "list",
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
            "Exit the program",
          ],
        name: "task"
    },
  ]
}
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
      console.log(response.affectedRows + " department created \n")
    }
  )
};

function addRole(){
  console.log("Creating a new role");
  var query = connection.query(
    "INSERT INTO role SET ?",
    // define an error function
    function(error, response){
      // if there is an error, stop the program
      if (error) throw error;
      // if successful, console log the message below
      console.log(response.affectedRows + " department created \n")
    }       
  )
};

function createEmployee(){
  console.log("Creating a new role");
  var query = connection.query(
    "INSERT INTO employee SET ?",
    // define an error function
    function(error, response){
      // if there is an error, stop the program
      if (error) throw error;
      // if successful, console log the message below
      console.log(response.affectedRows + " department created \n")
    }
  )
};

function readDepartment(){

};

function readRole(){

};

function readEmployee(){

};

function updateEmployee(){
  console.log("Updating employee information");
  var query = connection.query(
    "UPDATE products SET ? WHERE ?",
    function(error, response){
    // if there is an error, stop the program
      if (error) throw error;
      // if successful, console log the message below
      console.log(response.affectedRows + " department created \n")
    }
  )
};