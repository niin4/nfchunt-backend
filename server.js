const express = require('express'),
  next = require('next')
  app = next(),
  http = require('http'),
  https = require('https'),
  server = express(),
  fs = require('fs'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  passport = require('passport');
  session = require('express-session'),
  winston = require('winston');

require('./helpers/passport')(passport);

//configure logging
const logger = new winston.Logger({
  level: 'error',
  transports: [
    new (winston.transports.File)({ filename: 'error.log' })
  ]
});

// bodyparser
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

// session
const sess = {
  secret: 'keyboard cat',
  cookie: {}
}

server.use(session(sess));
server.use(passport.initialize());
server.use(passport.session());

server.enable('trust proxy');

server.use('/public', express.static('www'));

// Set up routes
require('./routes')(server, passport);
const nextRoutes = require('./routes/nextRoutes');
const handler = nextRoutes.getRequestHandler(app)
server.use(handler);

// set up error for api calls
server.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err)
  }
  console.log(JSON.stringify(err));
  res.status(err.status || 500).json(err);
  logger.log('error', 'Error', err.message)
})

if (process.env.NODE_ENV !== 'production') {
  // ssl
  const sslkey = fs.readFileSync('key.pem');
  const sslcert = fs.readFileSync('cert.pem');

  const options = {
    key: sslkey,
    cert: sslcert,
  };
  const httpsServer = https.createServer(options, server);

  app.prepare().then(() => {
    httpsServer.listen(8080, (err) => {
      if (err) {
        console.log(err);
        throw err;
      }
      console.log('server listening on port 8080')
    })
  })
} else {
  server.use((req, res, next) => {
    if (req.secure) {
      // request was via https, so do no special handling
      next();
    } else {
      // request was via http, so redirect to https
      res.redirect('https://' + req.headers.host + req.url);
    }
  });

  app.prepare().then(() => {
    server.listen(8080, (err) => {
      console.log(err);
    });
  })
}
