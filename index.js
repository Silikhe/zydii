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
app.post('/auth', function(request, response) {
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


//Post the result
app.post('/res', function(request, response) {
	var username = request.body.username;
	var password = request.body.password;
	if (username && password) {
		connection.query('SELECT * FROM result WHERE number = @last_number', [number], function(error, res, fields) {
			if (res.length > 0) {
                const Input_a = document.getElementById("Quadratic_Comma_Separator");
                request.session.res = res;
                Input_a.innerText=  request.session.res
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

app.get('/calc', function(request, response) {
	if (request.session.loggedin) {
		response.send('Welcome back, ' + request.session.username + '!');
        response.sendFile(path.join(__dirname + '/index.html'));
	} else {
		response.send('Please login to view Calculator');
	}
	response.end();
});



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




