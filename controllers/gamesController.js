'use strict';
const shortid = require('shortid');
shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@');

// TODO: Shortcode generation

var db = require('../dbConnection.js');
var connection = db();

/**
 * @api {get} /games/:id Get game by id
 * @apiName getGame
 * @apiGroup Games
 * 
 * @apiParam {Number} id Game's id
 * 
 * @apiSuccessExample Success-Response:
 *  HTTP  /1.1 200 OK
 *  {
 *    "g_id": 2,
 *    "g_user": "Player1",
 *    "g_shortcode": "rygyB@5cG"
 *  }
 * @apiError (404 Document not found) GameNotFound Game with <code>id</code> was not found.
 * @apiError (500 Internal server error) DatabaseError Problem fetching data from database.
 */
exports.get_game = (req, res) => {
  var sql = `SELECT * FROM Games WHERE g_id = ?`;
  connection.query(sql, [req.params.id], (err, results) => {
    if (err) {
      res.statusCode = 500;
      return res.json({ errors: [`Database error, could not retrieve games`] });
    }
    if (results.length === 0) {
      res.statusCode = 404;
      return res.json({ errors: [`Games not found`] });
    }
    res.statusCode = 200;
    return res.json(results[0]);
  }); 
}

/** Create game */
// TODO: Error if empty fields
 
/**
 * @api {post} /games/ Create a game
 * @apiName CreateGame
 * @apiGroup Games
 * 
 * @apiDescription Creates a game and returns the created object.
 * 
 * @apiParam {String} user User's id
 * @apiParam {String} name Name for the game
 * @apiParam {String} welcometext Game's info/welcome text
 * @apiParam {String} completedtext Game's win text
 * 
 * @apiSuccessExample Success-response:
 * HTTP  /1.1 200 OK
 *  {
 *    "g_id": 2,
 *    "g_user": "Player1",
 *    "g_shortcode": "rygyB@5cG"
 *  }
 * @apiError (500 Internal server error) DatabaseError Problem fetching data from database.
 */
exports.create_game = (req, res) => {
  const newShortid = shortid.generate();
  var sql = 'INSERT INTO Games (g_user, g_shortcode, g_name, g_welcometext, g_completedtext) VALUES (?,?,?,?,?)';
  var data = [
    req.body.user,
    newShortid,
    req.body.name,
    req.body.welcometext,
    req.body.completedtext
  ];
  connection.query(sql, data, (err, result) => {
    if (err) {
      console.error(err);
      res.statusCode = 500;
      return res.json({
        errors: ['Database error, failed to create new game']
      });
    }
    var sql = 'SELECT * FROM Games WHERE g_id = LAST_INSERT_ID()';
    connection.query(sql, (err, result) => {
      if (err) {
        console.error(err);
        res.statusCode = 500;
        return res.json({
          errors: ['Could not retrieve game after creating']
        });
      }
      // The request created a new resource object
      res.statusCode = 201;
      // The result of CREATE should be the same as GET
      return res.json(result[0]);
  });
});
}
/**
 * @api {patch} /games/:id Update a game
 * @apiName UpdateGame
 * @apiGroup Games
 * 
 * @apiParam {Number} id Game's id
 * @apiParam {String} [name] New name for the game
 * @apiParam {String} [welcometext] New game's info/welcome text
 * @apiParam {String} [completedtext] New game's win text
 * 
 * @apiSuccessExample Success-response:
 * HTTP  /1.1 200 OK
 *  {
 *    "message": "Game updated successfully"
 *  }
 * @apiError (400 Bad request) MissingParameters Missing parameter <code>id</code> from request.
 * @apiError (500 Internal server error) DatabaseError Problem fetching data from database.
 */
exports.update_game = (req, res) => {
  if (req.params.id == undefined) {
    res.statusCode = 400;
    return res.json({ errors: [`Missing parameters for game id`] });
  }

  let conditions = [];
  let values = [];
  let set = '';

  if (req.body.name !== undefined) {
    conditions.push('g_name = ?');
    values.push(req.body.name)
  } 
  if (req.body.welcometext !== undefined) {
    conditions.push('g_welcometext = ?');
    values.push(req.body.welcometext)
  }
  if (req.body.completedtext !== undefined) {
    conditions.push('g_completedtext = ?');
    values.push(req.body.completedtext)
  }
  set = conditions.length ? conditions.join(', ') : '1';

  var sql = `UPDATE Games SET ${set} WHERE g_id = ?`;
  connection.query(sql, [...values, req.params.id], (err, results) => {
    if (err) {
      res.statusCode = 500;
      return res.json({ errors: [`Could not update game`] });
    }
    res.statusCode = 200;
    return res.json({message: 'Game updated successfully'});
  }); 
}

/**
 * @api {get} /games/ Query games by parameters
 * @apiName GetGames
 * @apiGroup Games
 * 
 * @apiParam {String} user  User's id -> Get games by user
 * @apiParam {Number} game  Game's unique id
 * 
 * @apiExample {curl} Example usage:
 *     curl -i http://localhost/games?user=Player1
 * 
 * @apiSuccessExample Success-Response:
 *  HTTP  /1.1 200 OK
 *  {
 *    "g_id": 2,
 *    "g_user": "Player1",
 *    "g_shortcode": "rygyB@5cG"
 *  }
 * @apiError (404 Document not found) GamesNotFound Games not found with search parameters.
 * @apiError (500 Internal server error) DatabaseError Problem fetching data from database.
 */
exports.query_games = (req, res) => {  
  let conditions = [];
  let values = [];
  let where = '';

  if (req.query.user !== undefined) {
    conditions.push('g_user = ?');
    values.push(req.query.user)
  } 
  if (req.query.gameid !== undefined) {
    conditions.push('g_id = ?');
    values.push(req.query.gameid)
  }
  where = conditions.length ? conditions.join(' AND ') : '1';

  var sql = `SELECT * FROM Games WHERE ${where}`;
  connection.query(sql, values, (err, results) => {
    if (err) {
      res.statusCode = 500;
      return res.json({ errors: [`Could not retrieve games`] });
    }
    if (results.length === 0) {
      res.statusCode = 404;
      return res.json({ errors: [`Games not found`] });
    }
    res.statusCode = 200;
    return res.json(results);
  }); 
};

/*
//TODO: 

Update game

Delete game

Create tag

Update tag

Create player

Get tags by game

Get players by game, count, leaderboard

Get tags by player in game

Create tag found by player

Delete tag

Empty game -> Remove found tags table by game

*/