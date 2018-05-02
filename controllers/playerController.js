'use strict';
const shortid = require('shortid');
shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@');

const db = require('../dbConnection.js');
const connection = db();

exports.query_players = (req, res, next) => {
  let conditions = [];
  let values = [];
  let where = '';

  if (req.query.game !== undefined) {
    conditions.push('p_game = ?');
    values.push(req.query.game)
  }
  where = conditions.length ? conditions.join(' AND ') : '1';

  const sql = `SELECT * FROM Players WHERE ${where}`;
  connection.query(sql, values, (err, results) => {
    if (err) return next({error: err, message: 'Error fetching from database'});
    if (results.length === 0) {
      return next({status: 404, message: 'No Players found'});
    }
    res.statusCode = 200;
    return res.json(results);
  }); 
};

/**
 * @api {post} /players/ Create player
 * @apiName CreatePlayer
 * @apiGroup Players
 * 
 * @apiParam {String} name Name for player
 * @apiParam {Number} game Game's id
 * @apiParam {Number} tag Found tag's id
 *  
 * @apiSuccessExample Success-Response:
 *  HTTP  /1.1 200 OK
 *  {
 *    "p_id": 2,
 *    "p_name": "John",
 *    "p_game": 1,
 *    "p_current": 5
 *  }
 * @apiError (500 Internal server error) DatabaseError Problem fetching data from database.
 */
exports.create_player = (req, res, next) => {
  if (req.body.name == undefined || req.body.game == undefined) {
    return next({error: 'Missing parameters' , message: 'Missing parameters'});
  }
  const sql = `
  INSERT INTO Players (p_name, p_game, p_current) 
  VALUES (?,?,
  (SELECT t_id from Tags 
    WHERE t_id NOT IN (SELECT tf_tag FROM Tagsfound)
    AND t_game = ? AND NOT t_id = ?
    ORDER BY rand() LIMIT 1)
  )`;
  console.log(req.body);
  const data = [
    req.body.name,
    req.body.game,
    req.body.game,
    req.body.tag
  ];
  connection.query(sql, data, (err, result) => {
    if (err) return next({error: err, message: 'Error fetching from database'});
    const sql = 'SELECT * FROM Players WHERE p_id = LAST_INSERT_ID()';
    connection.query(sql, (err, result) => {
      if (err) return next({error: err, message: 'Error fetching from database'});
      res.statusCode = 201;
      return res.json(result[0]);
  });
});
}

/**
 * @api {get} /hint/:id Get hint for player
 * @apiName GetHint
 * @apiGroup Players
 * 
 * @apiParam {Number} id Player's id
 *  
 * @apiSuccessExample Success-Response:
 *  HTTP  /1.1 200 OK
 *  {
 *    "hint": "Roses are red, ___ are blue..."
 *  }
 * @apiError (500 Internal server error) DatabaseError Problem fetching data from database.
 */
exports.get_hint = (req, res, next) => {
  const sql = `
  SELECT t.t_hint AS hint FROM Tags AS t INNER JOIN Players AS p ON t.t_id = p.p_current
  WHERE p.p_id = ? LIMIT 1`;
  connection.query(sql, [req.params.id], (err, result) => {
    if (err) return next({error: err, message: 'Error fetching from database'});
    res.statusCode = 200;
    return res.json(result[0]);
  });
}