'use strict';
const shortid = require('shortid');
shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@');

const db = require('../dbConnection.js');
const connection = db();

/**
 * @api {get} /tags Query tags
 * @apiName QueryTags
 * @apiGroup Tags
 * 
 * @apiParam {Number} game Game's id
 * 
 * @apiExample {curl} Example usage:
 *     curl -i http://localhost/tags?game=4
 *  
 * @apiSuccessExample Success-Response:
 *  HTTP  /1.1 200 OK
 *  [
 *	{
 *		"t_id": 1,
 *		"t_game": 1,
 *		"t_shortcode": "HyKbkI5iz",
 *		"t_name": "Väinö",
 *		"t_hint": "Alla omenapuun, ei voi olla kukaan muu, siellä siellä se ___ on..."
 *	},
 *	{
 *		"t_id": 5,
 *		"t_game": 1,
 *		"t_shortcode": "xbbBB",
 *		"t_name": "Kahvi",
 *		"t_hint": "Elämän eliksiiri"
 *	}
 * ]
 * @apiError (404 Document not found) TagsNotFound No tags found
 * @apiError (500 Internal server error) DatabaseError Problem fetching data from database.
 */
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

/**
 * @api {post} /tags Create tag
 * @apiName CreateTag
 * @apiGroup Tags
 * 
 * @apiParam {String} name Name for tag
 * @apiparam {Number} game Tag's game
 * @apiParam {String} hint Tag's hint
 * 
 * @apiHeader {String="Bearer :token"} Authorization Replace <code>:token</code> with supplied JWT-token
 * 
 * @apiSuccessExample Success-Response:
 *  HTTP  /1.1 200 OK
 *	{
 *		"t_id": 1,
 *		"t_game": 1,
 *		"t_shortcode": "HyKbkI5iz",
 *		"t_name": "Väinö",
 *		"t_hint": "Alla omenapuun, ei voi olla kukaan muu, siellä siellä se ___ on..."
 *	}
 * @apiError (500 Internal server error) DatabaseError Problem fetching data from database.
 */
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

/**
 * @api {post} /tags/:shortcode Get tag
 * @apiName GetTag
 * @apiGroup Tags
 * 
 * @apiParam {String} shortcode Tag's shortcode
 * 
 * @apiSuccessExample Success-Response:
 *  HTTP  /1.1 200 OK
 *	{
 *		"tag": "Väinö",
 *		"tag_id": 1,
 *		"game": "Bileet",
 *		"game_id": 5,
 *	}
 * @apiError (500 Internal server error) DatabaseError Problem fetching data from database.
 */
exports.get_tag = (req, res, next) => {
  const sql = `SELECT t.t_name AS tag, t.t_id AS tag_id, g.g_name AS game, g.g_id AS game_id, g.g_welcometext AS welcometext 
  FROM Tags AS t 
  INNER JOIN Games AS g ON t.t_game = g.g_id
  WHERE t.t_shortcode = ?`;
  connection.query(sql, [req.params.shortcode], (err, results) => {
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
 * @api {get} /tagsfound Query found tags
 * @apiName QueryTagsfound
 * @apiGroup Tags
 * 
 * @apiParam {Number} [game] Id of the game
 * @apiParam {Number} [player] Id of the player
 * 
 * @apiSuccessExample Success-Response:
 *  HTTP  /1.1 200 OK
 *	{
 *		"id": 1,
 *		"tag": "Väinö",
 *		"hint": "Maybe mysterious..",
 *		"game": "Bileet",
 *    "player": "Mikko",
 *    "found": 2018-15-5
 *	}
 * @apiError (400 Invalid query) InvalidQueryError Invalid query parameter
 * @apiError (500 Internal server error) DatabaseError Problem fetching data from database.
 */
exports.query_tagsfound = (req, res, next) => {
  let conditions = [];
  let values = [];
  let where = '';

  if (req.query.game !== undefined) {
    if (!isNaN(req.query.game)) {
      conditions.push('tf_game = ?');
      values.push(req.query.game)
    } else {
      return next({status: 400, message: 'Invalid query parameter'})
    }
  }
  if (req.query.player !== undefined) {
    if (!isNaN(req.query.player)) {
      conditions.push('tf_player = ?');
      values.push(req.query.player);
    } else {
      return next({status: 400, message: 'Invalid query parameter'})
    }
  }
  if (req.query.player == undefined && req.query.game == undefined) {
    return next({status: 400, message: 'Missing query parameters'})
  }
  where = conditions.length ? conditions.join(' AND ') : '1';

  const sql = `
    SELECT t.t_id AS id, t.t_name AS tag, t.t_hint AS hint, g.g_name AS game, p.p_name AS player, tf.tf_time AS found
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

/**
 * @api {post} /tagsfound Post found tag
 * @apiName PostTagsfound
 * @apiGroup Tags
 * @apiDescription Try to post found tag, gives either error 304 of ducplicate entry or marks the tags as found. If player won the game status 303 is given
 * 
 * @apiParam {Number} tag Id of the tag
 * @apiParam {Number} player Id of the player
 * @apiParam {Number} game Id of the game
 * 
 * @apiSuccessExample Success-Response:
 *  HTTP  /1.1 201 OK
 *	{
 *		"status": "Hint updated"
 *	}
 * @apiError (304 Duplicate entry) DuplicateEntry Duplicate entry
 * @apiError (500 Internal server error) DatabaseError Problem fetching data from database.
 */
exports.tag_found = (req, res, next) => {
  let sql = 'INSERT INTO Tagsfound (tf_tag, tf_player, tf_game) VALUES (?,?,?)';
  let data = [
    req.body.tag,
    req.body.player,
    req.body.game
  ];
  connection.query(sql, data, (err, result) => {
    if (err) {
      if (err.code == 'ER_DUP_ENTRY') {
        res.statusCode = 304;
        res.json({ status: 'Duplicate entry' })
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
          res.json({ status: 'All tags found' })
        } else {
          // check if player found current hint
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
              res.json({ status: 'Hint updated' });
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

/**
 * @api {get} /leaderboard/:game Get leaderboard for game
 * @apiName Leaderboard
 * @apiGroup Games
 * 
 * @apiParam {Number} game Id of the game
 * 
 * @apiSuccessExample Success-Response:
 *  HTTP  /1.1 202 OK
 *	[
 *   {
 *       "game": "Uusi",
 *       "player": "Moi",
 *       "count": 1,
 *       "lastfound": "2018-04-27T09:04:51.000Z"
 *   }
 * ]
 * @apiError (404 Not found) NoResults No results for game.
 * @apiError (500 Internal server error) DatabaseError Problem fetching data from database.
 */
exports.get_leaderboard = (req, res, next) => {
  const sql = `
  SELECT g.g_name AS game, 
  p.p_name AS player, 
  COUNT(tf.tf_id) AS count, 
  MAX(tf.tf_time) AS lastfound 
  FROM Tagsfound AS tf 
  LEFT JOIN Games AS g ON tf.tf_game = g.g_id 
  LEFT JOIN Tags AS t ON tf.tf_tag = t.t_id 
  LEFT JOIN Players AS p ON tf.tf_player = p.p_id 
  WHERE tf.tf_game = ? 
  GROUP BY tf.tf_player ORDER BY count DESC, lastfound ASC`;
  connection.query(sql, [req.params.game], (err, results) => {
    if (err) return next({ error: err, message: 'Error fetching from database' });
    if (results.length === 0) {
      return next({ status: 404, message: 'No entries found for game' });
    }
    res.statusCode = 200;
    return res.json(results);
  });
}

