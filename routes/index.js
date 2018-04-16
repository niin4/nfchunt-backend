'use strict';

module.exports = (app) => {
  require('./gamesRoutes')(app);
  require('./tagRoutes')(app);
  require('./playerRoutes')(app);
}