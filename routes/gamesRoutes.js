'use strict';
module.exports = function(app) {
  var gamesController = require('../controllers/gamesController');

  // get all games for user
  app.route('/games/:user')
    .get(gamesController.query_games);

  // create new game
  app.route('/games')
  .post(gamesController.create_game);

};