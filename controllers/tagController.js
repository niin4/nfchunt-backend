'use strict';
const shortid = require('shortid');
shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@');

const db = require('../dbConnection.js');
const connection = db();

exports.query_tags = (req, res, next) => {
  let conditions = [];
  let values = [];
  let where = '';

  if (req.query.game !== undefined) {
    conditions.push('t_game = ?');
    values.push(req.query.game)
  }
  where = conditions.length ? conditions.join(' AND ') : '1';

  var sql = `SELECT * FROM Tags WHERE ${where}`;
  connection.query(sql, values, (err, results) => {
    if (err) return next({ error: err, message: 'Error fetching from database' });
    if (results.length === 0) {
      return next({ status: 404, message: 'No Tags found' });
    }
    res.statusCode = 200;
    return res.json(results);
  });
};

exports.create_tag = (req, res, next) => {
  const newShortid = shortid.generate();
  var sql = 'INSERT INTO Tags (t_game, t_shortcode, t_name, t_hint) VALUES (?,?,?,?)';
  var data = [
    req.body.game,
    newShortid,
    req.body.name,
    req.body.hint
  ];
  connection.query(sql, data, (err, result) => {
    if (err) return next({ error: err, message: 'Error fetching from database' });
    const sql = 'SELECT * FROM Tags WHERE t_id = LAST_INSERT_ID()';
    connection.query(sql, (err, result) => {
      if (err) return next({ error: err, message: 'Error fetching from database' });
      res.statusCode = 201;
      return res.json(result[0]);
    });
  });
}

exports.get_tag = (req, res, next) => {
  var sql = `SELECT t.t_name AS tag, t.t_id AS tag_id, g.g_name AS game, g.g_id AS game_id 
  FROM Tags AS t 
  INNER JOIN Games AS g ON t.t_game = g.g_id
  WHERE t.t_id = ?`;
  connection.query(sql, [req.params.id], (err, results) => {
    if (err) {
      return next({ error: err, message: 'Error fetching from database' });
    }
    if (results.length === 0) {
      return next({ status: 404, message: 'No tags found' });
    }
    res.statusCode = 200;
    return res.json(results[0]);
  });
}

/**
 * @apiDescription Query tags per game or player, returns a list of tags.
 */
exports.query_tagsfound = (req, res, next) => {
  let conditions = [];
  let values = [];
  let where = '';

  if (req.query.game !== undefined) {
    conditions.push('tf_game = ?');
    values.push(req.query.game)
  }
  if (req.query.player !== undefined) {
    conditions.push('tf_player = ?');
    values.push(req.query.player);
  }
  where = conditions.length ? conditions.join(' AND ') : '1';

  var sql = `
    SELECT t.t_name AS tag, g.g_name AS game, p.p_name AS player, tf.tf_time AS found
    FROM Tagsfound AS tf 
    INNER JOIN Games AS g ON tf_game = g_id 
    INNER JOIN Tags AS t ON tf_tag = t_id 
    INNER JOIN Players AS p ON tf_player = p_id 
    WHERE ${where} 
    ORDER BY t.t_name`;
  connection.query(sql, values, (err, results) => {
    if (err) return next({ error: err, message: 'Error fetching from database' });
    if (results.length === 0) {
      return next({ status: 404, message: 'No Tags found' });
    }
    res.statusCode = 200;
    return res.json(results);
  });
}

exports.tag_found = (req, res, next) => {
  var sql = 'INSERT INTO Tagsfound (tf_tag, tf_player, tf_game) VALUES (?,?,?)';
  var data = [
    req.body.tag,
    req.body.player,
    req.body.game
  ];
  connection.query(sql, data, (err, result) => {
    if (err) return next({ error: err, message: 'Error fetching from database' });
    res.statusCode = 201;
    return res.json({ status: 'Success' });
  });
}

exports.get_leaderboard = (req, res, next) => {
  var sql = `
  SELECT p.p_name AS player, COUNT(tf.tf_player) AS count, MAX(tf.tf_time) AS lastfound
  FROM Tagsfound AS tf 
  INNER JOIN Games AS g ON tf_game = g_id 
  INNER JOIN Tags AS t ON tf_tag = t_id 
  INNER JOIN Players AS p ON tf_player = p_id 
  WHERE tf_game = ? 
  GROUP BY p.p_name
  ORDER BY count DESC`;
  connection.query(sql, [req.params.game], (err, results) => {
    if (err) return next({ error: err, message: 'Error fetching from database' });
    if (results.length === 0) {
      return next({ status: 404, message: 'No Tags found' });
    }
    res.statusCode = 200;
    return res.json(results);
  });
}

