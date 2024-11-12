const http = require("http");
const express = require('express');
const cookieParser = require('cookie-parser');
const escape = require('escape-html');
const serialize = require('node-serialize');
const bodyParser = require('body-parser');
var fs = require('fs');
process.env.PWD = process.cwd()
const port = 59067;
const cookieName = 'profile';

var app = express();
app.use(cookieParser())
var urlencodedParser = bodyParser.urlencoded({ extended: true });

app.get('/', function(req, res) {
app.use(express.static(process.env.PWD + '/css'));
	try {
		if (req.cookies.profile) {
			var profileString = new Buffer(req.cookies.profile, 'base64').toString();
			var profileObject = serialize.unserialize(profileString);
			if (profileObject.userName == 'admin' && profileObject.passWord == 'password') {
			res.send("<html><head><style>#adm{position:relative;color:white;text-align:center;font-size:50px;top:350px;font-weight:bolder;}body{background-color:grey;}</style></head><body><p id='adm'>Welcome back ! You are logged now ! </p></body></html>");}
		}
	}
	catch(error){
		console.log(error);
	}
	app.use(express.static(process.env.PWD + '/css'));
	res.sendFile('./index.html',{root: __dirname });
});


app.post('/form', urlencodedParser, function(req, res) {
	try {

		var profile = { "userName": "Anonymous"};
		var encodedCookie = '';

		if (req.body.userName) {
			var username = JSON.stringify(req.body.userName).replace(/[^0-9a-z]/gi, '');
			profile.userName = username;
		}
		if (req.body.passWord) {
                        var password = JSON.stringify(req.body.passWord).replace(/[^0-9a-z]/gi, '');
                        profile.passWord = password;
                }
	}
	catch(error) {
		console.log(error);
	}
	var encodedCookie = new Buffer(JSON.stringify(profile)).toString('base64');
	res.cookie(cookieName, encodedCookie);
	res.redirect(303,'/');
});
app.listen(port);
