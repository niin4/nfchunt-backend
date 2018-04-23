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

  const sql = `SELECT * FROM Tags WHERE ${where}`;
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
  let sql = 'INSERT INTO Tags (t_game, t_shortcode, t_name, t_hint) VALUES (?,?,?,?)';
  const data = [
    req.body.game,
    newShortid,
    req.body.name,
    req.body.hint
  ];
  connection.query(sql, data, (err, result) => {
    if (err) return next({ error: err, message: 'Error fetching from database' });
    let sql = 'SELECT * FROM Tags WHERE t_id = LAST_INSERT_ID()';
    connection.query(sql, (err, result) => {
      if (err) return next({ error: err, message: 'Error fetching from database' });
      res.statusCode = 201;
      return res.json(result[0]);
    });
  });
}

exports.get_tag = (req, res, next) => {
  const sql = `SELECT t.t_name AS tag, t.t_id AS tag_id, g.g_name AS game, g.g_id AS game_id 
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

  const sql = `
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
  let sql = 'INSERT INTO Tagsfound (tf_tag, tf_player, tf_game) VALUES (?,?,?)';
  let data = [
    req.body.tag,
    req.body.player,
    req.body.game
  ];
  connection.query(sql, data, (err, result) => {
    if (err) {
      console.log(err.code);
      if (err.code == 'ER_DUP_ENTRY') {
        res.statusCode = 304;
        res.json({ status: 'Duplicate find' })
      } else {
        return next({ error: err, message: 'Error fetching from database' });
      }
    } else {
      // check if player found all tags
      let sql = `SELECT t_id from Tags 
      WHERE t_id NOT IN (SELECT tf_tag FROM Tagsfound WHERE tf_player = ?)
      AND t_game = ? ORDER BY rand() LIMIT 1`;
      let data = [
        req.body.player,
        req.body.game
      ]
      connection.query(sql, data, (err, results) => {
        if (err) return next({ error: err, message: 'Error fetching from database' });
        if (!results.length) {
          console.log('winner winner chicken dinner');
          res.statusCode = 303;
          res.json({status: 'All tags found'})
        } else {
          // check f player found current hint
          // update hint
          if (req.body.tag == req.body.current) {
            let sql = `
            UPDATE Players SET p_current = ? WHERE p_id = ?`
            let data = [
              results[0].t_id,
              req.body.player
            ]
            connection.query(sql, data, (err, results) => {
              if (err) return next({ error: err, message: 'Error fetching from database' });
              res.statusCode = 201;
              res.json({ status: 'Hint updated'});
            });
          } else {
            res.statusCode = 200;
            res.json({ status: 'Success' });
          }
        }
      });
    }
    return res;
  });
}

exports.get_leaderboard = (req, res, next) => {
  const sql = `
  SELECT g.g_name AS game, p.p_name AS player, COUNT(tf.tf_player) AS count, MAX(tf.tf_time) AS lastfound
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

