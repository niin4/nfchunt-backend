'use strict';

module.exports = function(app) {
  var tagController = require('../controllers/tagController');

  app.route('/tags')
  .get(tagController.query_tags)
  .post(tagController.create_tag);

  app.route('/tags/:id')
  .get(tagController.get_tag);

  app.route('/tagsfound')
  .get(tagController.query_tagsfound)
  .post(tagController.tag_found);

  app.route('/leaderboard/:game')
  .get(tagController.get_leaderboard);
};

//TODO: 

/*


Update tag

Delete tag

*/