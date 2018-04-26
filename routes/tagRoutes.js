'use strict';

module.exports = function(app, passport) {
  var tagController = require('../controllers/tagController');

  app.route('/tags')
  .get(tagController.query_tags)
  .post(passport.authenticate('jwt', {session: false}), tagController.create_tag);

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