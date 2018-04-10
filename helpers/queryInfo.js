const moment = require('moment');

exports.getClientInfo = (req, res, next) => {
  const ip = req.headers['x-forwarded-for'] || 
  req.connection.remoteAddress || 
  req.socket.remoteAddress;

  console.log(`TIME: ${moment().format()}`);
  console.log(`PATH: ${req.route.path}`);
  console.log(`IP:  ${ip}`);
  console.log(`BROWSER: ${req.headers['user-agent']}`);

  next();
}