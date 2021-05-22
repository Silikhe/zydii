const express = require("express");
const app = express();
const port = 3000;
const fs = require("fs");
var mysql = require("mysql");
// var express = require('express');
var session = require("express-session");
var bodyParser = require("body-parser");
var path = require("path");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "zydii",
});

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//get to login
app.get('/', function(request, response) {
	response.sendFile(path.join(__dirname + '/login.html'));
});



//login the user
app.post('/', function(request, response) {
	var username = request.body.username;
	var password = request.body.password;
	if (username && password) {
		connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
				response.redirect('/home');
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});


//redirect to login

app.get('/index', function(request, response) {
	if (request.session.loggedin) {
		response.send('Welcome back, ' + request.session.username + '!');
	} else {
		response.send('Please login to view Calculator');
	}
	response.end();
});

const Input_a = document.getElementById("Input-A");
const Input_b = document.getElementById("Input-B");
const Input_c = document.getElementById("Input-C");
const Input_d = document.getElementById("Input-D");




// qustion 1a
const vuvuzela = (a, b, c) => {
  a = parseInt(a);
  b = parseInt(b);
  if ((c != "+" || "-" || "/" || "*")) {
    return 0;
  }

  let result = `${a}  ${c}  ${b}`;
  result = eval(result)
  return result;
};


eval(vuvuzela(2, 4, "/"))




//question b
app.post('/vuvuzela', function(request, response) {
	var result = request.body.result;
	if (result) {
		connection.query('SELECT * FROM result', function(error, results) {
			if (results.length > 0) {
				request.session.data = true;
				response.redirect('/calc');
			} else {
				response.send(1);
			}
			response.end();
		});
	} else {
		response.send(2);
		response.end();
	}
});




// const postResult = () => {
//   fetch("http://localhost:3000/vuvuzela", {
//     method: "post",
//     header: {
//       Accept: "application/json",
//       "Content-type": "application/json",
//     },
//     body: JSON.stringify({
//       result: result,
//     }),
//   })
//     .then((response) => response.json())
//     .then((responseJson) => {
//       var myJSON = JSON.stringify(responseJson);
//       console.log(myJSON);
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// };
// postResult();
