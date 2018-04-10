'use strict';

module.exports = function(app) {
  var tagController = require('../controllers/tagController');

  app.route('/tags')
  .post(tagController.create_tag)

  app.route('/tags/:id')
  .get(tagController.get_tag);
};

//TODO: 

/*
Create tag

Update tag

Get tags by game

Get tags by player in game

Create tag found by player

Delete tag

*/