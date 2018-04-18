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

  var sql = `SELECT * FROM Players WHERE ${where}`;
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
  var sql = 'INSERT INTO Players (p_name, p_game) VALUES (?,?)';
  console.log(req.body);
  var data = [
    req.body.name,
    req.body.game
  ];
  connection.query(sql, data, (err, result) => {
    if (err) return next({error: err, message: 'Error fetching from database'});
    const sql = 'SELECT * FROM Players WHERE p_id = LAST_INSERT_ID()';
    connection.query(sql, (err, result) => {
      if (err) return next({error: err, message: 'Error fetching from database'});
      res.statusCode = 201;
      res.cookie('userid', result[0].p_id);
      res.cookie('username', result[0].p_name);
      return res.json(result[0]);
  });
});
}