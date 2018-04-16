'use strict';
var queryHelper = require('../helpers/queryInfo.js');

module.exports = function(app) {
  var gamesController = require('../controllers/gamesController');

  // get games by parameter
  app.route('/games')
  .get(queryHelper.getClientInfo, gamesController.query_games)
  .post(gamesController.create_game)

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