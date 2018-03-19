// https://www.codementor.io/olatundegaruba/nodejs-restful-apis-in-11-minutes-q0sgsfhbd

var express = require('express'),
http     = require('http'),
app = express(),
fs = require('fs'),
bodyParser = require('body-parser'),
cors = require('cors');

app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

var routes = require('./routes/gamesRoutes'); //importing route
routes(app); //register the route

http.createServer(app).listen(8099, function(){
	console.log('Server listening on port 8099');
});
