'use strict';
module.exports = function(app) {
  var gamesController = require('../controllers/gamesController');

  // get games by parameter
  app.route('/games')
  .get(gamesController.query_games)
  .post(gamesController.create_game)

  app.route('/games/:id')
  .get(gamesController.get_game)
  .patch(gamesController.update_game);

};

//TODO: 

/*
Update game

Delete game

Create tag

Update tag

Create user

Create player

Get tags by game

Get players by game, count, leaderboard

Get tags by player in game

Create tag found by player

Delete tag

Empty game -> Remove found tags table by game

Authenticate device -> instance id?

Authenticate user -> json web token?

*/