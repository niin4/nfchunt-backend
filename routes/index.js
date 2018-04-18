'use strict';

module.exports = (app, passport) => {
  require('./gamesRoutes')(app);
  require('./tagRoutes')(app);
  require('./playerRoutes')(app);
  require('./loginRoutes')(app, passport);
  const helper = require('../helpers/userInfoHelper.js');

}
