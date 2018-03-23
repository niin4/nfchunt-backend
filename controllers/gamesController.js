'use strict';
const shortid = require('shortid');
shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@');

// TODO: Shortcode generation

var db = require('../dbConnection.js');
var connection = db();

/** Get games for user by g_id */
exports.query_games = function(req, res) {  
  
    console.log(req.params.user);
    var userId = req.params.user;
    var sql = `SELECT * FROM games WHERE g_user = ?`;
    connection.query(sql, [ userId ], function(err, results) {
      if (err) {
        console.error(err);
        res.statusCode = 500;
        return res.json({ errors: [`Could not retrieve games for user`] });
      }
      if (results.length === 0) {
        res.statusCode = 404;
        return res.json({ errors: [`Games not found`] });
      }
      return res.json(results);
    }); 
};

/** Create game */
// TODO: Error if empty fields
 
exports.create_game = function(req, res) {
  const newShortid = shortid.generate();
  var sql = 'INSERT INTO games (g_user, g_shortcode, g_name, g_welcometext, g_completedtext) VALUES (?,?,?,?,?)';
  // Retrieve the data to insert from the POST body
  var data = [
    req.body.user,
    newShortid,
    req.body.name,
    req.body.welcometext,
    req.body.completedtext
  ];
  connection.query(sql, data, function(err, result) {
    if (err) {
      console.error(err);
      res.statusCode = 500;
      return res.json({
        errors: ['Failed to create new game']
      });
    }
    var sql = 'SELECT * FROM games WHERE g_id = LAST_INSERT_ID()';
    connection.query(sql, function(err, result) {
      if (err) {
        // We shield our clients from internal errors, but log them
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

exports.create_tag = function(req, res) {
  const newShortid = shortid.generate();
  var sql = 'INSERT INTO games (g_user, g_shortcode, g_name, g_welcometext, g_completedtext) VALUES (?,?,?,?,?)';
  // Retrieve the data to insert from the POST body
  var data = [
    req.body.user,
    newShortid,
    req.body.name,
    req.body.welcometext,
    req.body.completedtext
  ];
  connection.query(sql, data, function(err, result) {
    if (err) {
      console.error(err);
      res.statusCode = 500;
      return res.json({
        errors: ['Failed to create new game']
      });
    }
    var sql = 'SELECT * FROM games WHERE g_id = LAST_INSERT_ID()';
    connection.query(sql, function(err, result) {
      if (err) {
        console.error(err);
        res.statusCode = 500;
        return res.json({
          errors: ['Could not retrieve game after creating']
        });
      }
      res.statusCode = 201;
      // The result of create
      return res.json(result[0]);
  });
});
}

