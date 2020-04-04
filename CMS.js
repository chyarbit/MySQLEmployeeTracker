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
  createDepartment();
});

function createDepartment(){

};

function createRole(){

};

function createEmployee(){

};

function readDepartment(){

};

function readRole(){

};

function readEmployee(){

};

function updateEmployee(){

};