const express = require('express'),
http     = require('http'),
app = express(),
fs = require('fs'),
bodyParser = require('body-parser'),
cors = require('cors'),
winston = require('winston');

//configure logging
const logger = new winston.Logger({
  level: 'error',
  transports: [
    new (winston.transports.File)({ filename: 'error.log' })
  ]
});

//app.enable('trust proxy');

app.use(bodyParser.json());
app.use(cors());

// Set up routes
require('./routes')(app)

app.use(express.static('www'));
//app.set('view engine', 'ejs');

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
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err)
  }
  console.log(JSON.stringify(err));
  res.status(err.status || 500).json(err);
  logger.log('error', 'Error', err.message)
})

http.createServer(app).listen(8080, function(){
	console.log('Server listening on port 8080');
});
