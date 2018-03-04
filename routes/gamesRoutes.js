'use strict';
module.exports = function(app) {
  var gamesController = require('../controllers/gamesController');

  // get all games for user
  app.route('/games/:user')
    .get(gamesController.query_games);

  // create new game
  app.route('/games')
  .post(gamesController.create_game);

  /*
  //get routedata by route_id
  app.route('/routes/:routeId')
    .get(routeList.read_a_route);
  //add new route
  app.route('/routes')
    .post(routeList.add_route);
  //search routes by city
  app.route('/q/:city')
  .get(routeList.query_routes_city);
    //search routes by length
  app.route('/q')
  .get(routeList.query_routes);
  //get list of cities and amount of routes per city
  app.route('/cities')
  .get(routeList.list_cities);

 app.route('/videos/search/:text')
    .get(videoList.find_by_text);
  
  app.route('/videos/tags/:tag')
    .get(videoList.find_by_tags);

  app.route('/videos/idsearch')
    .post(videoList.find_by_list);*/

};