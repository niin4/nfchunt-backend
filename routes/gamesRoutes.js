'use strict';
const queryHelper = require('../helpers/queryInfo.js');

module.exports = function(app, passport) {
  const gamesController = require('../controllers/gamesController');

  // get games by parameter
  app.route('/games')
  .get(passport.authenticate('jwt', {session: false}), gamesController.query_games)
  .post(passport.authenticate('jwt', {session: false}), gamesController.create_game)

  app.route('/games/:id')
  .get(gamesController.get_game)
  .patch(gamesController.update_game)
  .delete(gamesController.delete_game);

};

//TODO: 

/*

Create user

Empty game -> Remove found tags table by game

Authenticate device -> instance id?

Authenticate user -> json web token?

*/