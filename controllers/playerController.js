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