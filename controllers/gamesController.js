'use strict';
const shortid = require('shortid');
shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@');

const db = require('../dbConnection.js');
const connection = db();

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
 *    "g_name": "Fun Game",
 *    "g_welcometext": "Welcome!",
 *    "g_completedtext": "Byebye :(",
 * 	  "players": 2,
*     "tags": 3
 *  }
 * @apiError (404 Document not found) GameNotFound Game with <code>id</code> was not found.
 * @apiError (500 Internal server error) DatabaseError Problem fetching data from database.
 */
exports.get_game = (req, res, next) => {
  const sql = `
  SELECT g_id, g_name, g_welcometext, g_completedtext, 
  (SELECT COUNT(Players.p_id) FROM Games LEFT JOIN Players ON Players.p_game = Games.g_id WHERE Players.p_game = g.g_id) AS players, 
  (SELECT COUNT(Tags.t_id) FROM Tags INNER JOIN Games ON Tags.t_game = Games.g_id WHERE Tags.t_game = g.g_id) AS tags 
  FROM Games AS g WHERE g_id = ? GROUP BY g_id
  `;
  connection.query(sql, [req.params.id], (err, results) => {
    if (err) {
      return next({error: err, message: 'Error fetching from database'});
    }
    if (results.length === 0) {
      return next({status: 404, message: 'No games found'});
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
 *    "g_name": "Fun Game",
 *    "g_welcometext": "Welcome!",
 *    "g_completedtext": "Byebye :("
 *  }
 * @apiError (500 Internal server error) DatabaseError Problem fetching data from database.
 */
exports.create_game = (req, res) => {
  const sql = 'INSERT INTO Games (g_user, g_name, g_welcometext, g_completedtext) VALUES (?,?,?,?)';
  const data = [
    req.user.u_id,
    req.body.name,
    req.body.welcometext,
    req.body.completedtext
  ];
  connection.query(sql, data, (err, result) => {
    if (err) return next({error: err, message: 'Error fetching from database'});
    const sql = 'SELECT * FROM Games WHERE g_id = LAST_INSERT_ID()';
    connection.query(sql, (err, result) => {
      if (err) return next({error: err, message: 'Error fetching from database'});
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
 * @apiError (500 Internal server error) DatabaseError Problem fetching data from database.
 */
exports.update_game = (req, res) => {
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

  const sql = `UPDATE Games SET ${set} WHERE g_id = ?`;
  connection.query(sql, [...values, req.params.id], (err, results) => {
    if (err) return next({error: err, message: 'Could not uodate game'});
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
exports.query_games = (req, res, next) => {  
  const user = req.user.u_id;
  const sql = `SELECT g_id, g_name, g_welcometext, g_completedtext, 
  (SELECT COUNT(Players.p_id) FROM Games LEFT JOIN Players ON Players.p_game = Games.g_id WHERE Players.p_game = g.g_id) AS players, 
  (SELECT COUNT(Tags.t_id) FROM Tags INNER JOIN Games ON Tags.t_game = Games.g_id WHERE Tags.t_game = g.g_id) AS tags 
  FROM Games AS g WHERE g_user = ? GROUP BY g_id`;
  connection.query(sql, [user], (err, results) => {
    if (err) return next({error: err, message: 'Error fetching from database'});
    if (results.length === 0) {
      return next({status: 404, message: 'No games found'});
    }
    res.statusCode = 200;
    return res.json(results);
  }); 
};

//TODO: Delete also related tags, users and usersFoundTags
exports.delete_game = (req, res, next) => {
  const sql = `DELETE FROM Games WHERE g_id = ?`;
  connection.query(sql, [req.params.id], (err, results) => {
    if (err) return next({error: err, message: 'Could not delete game'});
    res.statusCode = 200;
    return res.json({message: 'Game deleted successfully'});
  }); 
}
