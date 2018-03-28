const express = require('express'),
http     = require('http'),
app = express(),
fs = require('fs'),
bodyParser = require('body-parser'),
cors = require('cors');

app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

const routes = require('./routes/gamesRoutes'); //importing route
routes(app); //register the route

http.createServer(app).listen(8080, function(){
	console.log('Server listening on port 8080');
});
