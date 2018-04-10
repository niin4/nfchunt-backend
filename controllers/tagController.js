'use strict';
const shortid = require('shortid');
shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@');

const db = require('../dbConnection.js');
const connection = db();

exports.create_tag = (req, res) => {
  const newShortid = shortid.generate();
  var sql = 'INSERT INTO Tags (t_game, t_shortcode, t_name, t_hint) VALUES (?,?,?,?)';
  var data = [
    req.body.game,
    newShortid,
    req.body.name,
    req.body.hint
  ];
  connection.query(sql, data, (err, result) => {
    if (err) return next({error: err, message: 'Error fetching from database'});
    const sql = 'SELECT * FROM Tags WHERE t_id = LAST_INSERT_ID()';
    connection.query(sql, (err, result) => {
      if (err) return next({error: err, message: 'Error fetching from database'});
      res.statusCode = 201;
      return res.json(result[0]);
  });
});
}

exports.get_tag = (req, res, next) => {
  var sql = `SELECT * FROM Tags WHERE t_id = ?`;
  connection.query(sql, [req.params.id], (err, results) => {
    if (err) {
      return next({error: err, message: 'Error fetching from database'});
    }
    if (results.length === 0) {
      return next({status: 404, message: 'No tags found'});
    }
    res.statusCode = 200;
    return res.json(results[0]);
  }); 
}