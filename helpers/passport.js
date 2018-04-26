const LocalStrategy = require('passport-local').Strategy;
const JWT = require("passport-jwt");
const ExtractJWT = JWT.ExtractJwt;
const JWTStrategy = JWT.Strategy;

require('isomorphic-unfetch');
require('es6-promise').polyfill();

const db = require('../dbConnection.js');
const connection = db();

module.exports = (passport) => {

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((id, done) => {
    done(null, id);
  });

  /**
   * Sign up
   */
  passport.use('local-signup', new LocalStrategy({
    // by default, local strategy uses username and password, we will override with email
    usernameField: 'name',
    passwordField: 'name',
    passReqToCallback: true, // allows us to pass back the entire request to the callback
  },
    (req, username, password, done) => {
      const userData = req.body;
      console.log('got body:');
      console.log(userData);
      if (req.body.name == undefined || req.body.game == undefined) {
        return done({ error: 'Missing parameters' });
      }
      const sql = `
        INSERT INTO Players (p_name, p_game, p_current) 
        VALUES (?,?,(
          SELECT t_id from Tags 
          WHERE t_game = ?
          ORDER BY rand() LIMIT 1)
        )`;
      const data = [
        req.body.name,
        req.body.game,
        req.body.game,
        req.body.tag
      ];
      connection.query(sql, data, (err, result) => {
        if (err) return done(err);
        const sql = 'SELECT * FROM Players WHERE p_id = LAST_INSERT_ID()';
        connection.query(sql, (err, result) => {
          if (err) return done(err);
          return done(null, result[0]);
        });
      })
    }
  ));


  /**
   * Login
   */
  passport.use('local-login', new LocalStrategy({
    // by default, local strategy uses username and password, we will override with email
    usernameField: 'id',
    passwordField: 'game',
    passReqToCallback: true // allows us to pass back the entire request to the callback
  },
    (req, username, password, done) => { // callback with email and password from our form
      const sql = 'SELECT * FROM Players WHERE p_id = ?';
      connection.query(sql, [username], (err, rows) => {
        if (err)
          return done(err);
        if (!rows.length) {
          return done({ error: 'No user found.' }); // req.flash is the way to set flashdata using connect-flash
        }

        // if the user is found but the password is wrong
        if (!(rows[0].p_game == password))
          return done({ error: 'Invalid user game combination' }); // create the loginMessage and save it to session as flashdata

        // all is well, return successful user
        console.log(rows[0]);
        return done(null, rows[0]);

      });
    }));

  passport.use('app-signup', new LocalStrategy({
    usernameField: 'instanceid',
    passwordField: 'password',
    passReqToCallback: true, // allows us to pass back the entire request to the callback
  },
    (req, username, password, done) => {
      if (req.body.instanceid == undefined || req.body.password == undefined) {
        return done({ error: 'Missing parameters' });
      }
      const sql = `
        INSERT INTO Users (u_instanceid, u_password) 
        VALUES (?,?)`;
      const data = [
        req.body.instanceid,
        req.body.password,
      ];
      connection.query(sql, data, (err, result) => {
        if (err) return done({error: 'Error inserting data'});
        const sql = 'SELECT u_id, u_instanceid FROM Users WHERE u_id = LAST_INSERT_ID()';
        connection.query(sql, (err, result) => {
          if (err) return done(err);
          console.log(result[0]);
          return done(null, result[0]);
        });
      })
    }
  ));

  passport.use('app-login', new LocalStrategy({
    // by default, local strategy uses username and password, we will override with email
    usernameField: 'instanceid',
    passwordField: 'password',
    passReqToCallback: true // allows us to pass back the entire request to the callback
  },
    (req, username, password, done) => { // callback with email and password from our form
      const sql = 'SELECT u_id, u_instanceid FROM Users WHERE u_instanceid = ?';
      connection.query(sql, [username], (err, rows) => {
        if (err)
          return done(err);
        if (!rows.length) {
          return done({ error: 'No user found.' }); // req.flash is the way to set flashdata using connect-flash
        }
        // if the user is found but the password is wrong
        if (!(rows[0].u_password == password))
          return done({ error: 'Invalid user game combination' }); // create the loginMessage and save it to session as flashdata

        // all is well, return successful user
        return done(null, rows[0]);

      });
    }));



  passport.use('jwt', new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: `${process.env.NFC_SECRET}`
  },
    function (jwtPayload, cb) {
      console.log(jwtPayload)
      console.log('checking...')
      return cb(null, jwtPayload);
    }
  ));
};


