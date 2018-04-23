'use strict';

module.exports = (app) => {
  var playerController = require('../controllers/playerController');

  app.route('/players')
  .get(playerController.query_players)
  .post(playerController.create_player);

  app.route('/hint/:id')
  .get(playerController.get_hint)
};