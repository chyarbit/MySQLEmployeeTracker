// dependencies needed
var connection = require("./connection.js");
// require mysql
var mysql = require("mysql");
// require inquirer
var inquirer = require("inquirer");

const empArray = [];
//console.log(empArray)

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
          "View all employees by department",
          "Add department",
          "Add role",
          "Add employee",
          "Update employee",
          "Exit the program"
        ],
    name: "task"
  },
]

function populateData(){
  connection.query(
    "SELECT * FROM employee",
    function(request,response){
      for (var i=0; i<response.length; i++){
        empArray.push(response[i].first_name + " " + response[i].last_name)
      }
    })
};

// define a function called Start to start the program
function start(){
populateData();
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

    case "View all employees by department":
      findAllEmployeesByDepartment();
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
      selectEmployeetoUpdate();
    break

    case "Exit the program":
      process.exit(-1);
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
  return connection.query(
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
      console.log("Department created");
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
  return connection.query(
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
      console.log("New role created");
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
  return connection.query(
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
      console.log("New employee entered");
      start();
    });
});
};

function viewDepartment(){
  return connection.query(
    "SELECT * FROM department", 
    function(error, response) {
      if (error) throw error;
      // Log all results of the SELECT statement
      console.table(response);
      start();
    });
};

function viewRole(){
  return connection.query(
    "SELECT * FROM role", 
    function(error, response) {
      if (error) throw error;
      // Log all results of the SELECT statement
      console.table(response);
      start();
    });
};

function viewEmployee(){
  return connection.query(
    "SELECT * FROM employee", 
    function(error, response) {
      if (error) throw error;
      // Log all results of the SELECT statement
      console.table(response);
      start();
    });
};

function findAllEmployeesByDepartment() {
  return connection.query(
  "SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role on employee.role_id=role.id LEFT JOIN department ON role.department_id=department.id",
    function(error, response) {
      if (error) throw error;
      // Log all results of the SELECT statement
      console.table(response);
      start();
    });
  }

function returnPrompt(){
  inquirer
  .prompt(
    {
    type: "confirm",
    message: "Are you done updating the information for this employee?",
    name: "exitUpdateMenu"
    }
  )
  .then(function({exitUpdateMenu}){
    if (!exitUpdateMenu){
      selectEmployeetoUpdate()
    }
    else{
      start();
    }
  })
}

function selectEmployeetoUpdate(){
inquirer
.prompt(
  {
    type: "rawlist",
    message: "Which employee would you like to update?",
    name: "employeeToUpdate",
    choices: empArray
  }
  )
  .then(function(data){
    //console.log(data)
    updateEmployee(data.employeeToUpdate);
  })
};

function updateEmployee(employee){
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
    //console.log(employee);
    //console.log(empArray.indexOf(employee) + 1)
    switch(answers.updateEmpChoice){
      case "Employee's First Name":
        connection.query(
        "UPDATE employee SET ? WHERE ?",
        [{
          first_name: answers.updateEmpFirstName,
        },        
        {
          id: empArray.indexOf(employee) + 1,
        }],
          function(error, response){
          // if there is an error, stop the program
            if (error) throw error;
          },
          returnPrompt()
        )
        break

        case "Employee's Last Name":
          connection.query(
          "UPDATE employee SET ? WHERE ?",
          [{
            first_name: answers.updateEmpLastName,
          },        
          {
            id: empArray.indexOf(employee) + 1,
          }],
            function(error, response){
            // if there is an error, stop the program
              if (error) throw error;
            },
            returnPrompt()
        )
        break
        
        case "Employee's Role Id":
          connection.query(
          "UPDATE employee SET ? WHERE ?",
          [{
            first_name: answers.updateEmpRoleId,
          },        
          {
            id: empArray.indexOf(employee) + 1,
          }],
          function(error, response){
            // if there is an error, stop the program
              if (error) throw error;
            },
            returnPrompt()
        )
        break

        case "Employee's Manager's Role Id":
          connection.query(
          "UPDATE employee SET ? WHERE ?",
          [{
            first_name: answers.updateEmpMgrId,
          },        
          {
            id: empArray.indexOf(employee) + 1,
          }],
          function(error, response){
            // if there is an error, stop the program
              if (error) throw error;
            },
            returnPrompt()
        )
        break    
    }
  });
};

start();

