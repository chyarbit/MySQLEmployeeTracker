// dependencies needed
// require mysql
var mysql = require("mysql");
// define connection as mysql's createConnection method
var util = require("util");

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
  });

  // set up to use promises rather than callbacks- allows for a
  connection.query = util.promisify(connection.query);

  module.exports = connection;