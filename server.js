const express = require('express'),
http     = require('http'),
app = express(),
fs = require('fs'),
bodyParser = require('body-parser'),
cors = require('cors');

//app.enable('trust proxy');

app.use(bodyParser.json());
app.use(cors());

const routes = require('./routes/gamesRoutes'); //importing route
routes(app); //register the route

app.use(express.static('www'));

/*
app.use ((req, res, next) => {
  if (req.secure) {
    // request was via https, so do no special handling
    next();
  } else {
    // request was via http, so redirect to https
    res.redirect('https://' + req.headers.host + req.url);
  }
});*/

http.createServer(app).listen(8080, function(){
	console.log('Server listening on port 8080');
});
