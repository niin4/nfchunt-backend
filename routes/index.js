'use strict';

module.exports = (app, passport) => {
  require('./gamesRoutes')(app, passport);
  require('./tagRoutes')(app, passport);
  require('./playerRoutes')(app, passport);
  require('./loginRoutes')(app, passport);

}
