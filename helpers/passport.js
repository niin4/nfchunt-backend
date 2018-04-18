const LocalStrategy = require('passport-local').Strategy;
require('isomorphic-unfetch');
require('es6-promise').polyfill();

const db = require('../dbConnection.js');
const connection = db();

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user.p_id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
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
        return done({error: 'Missing parameters'});
      }
      var sql = 'INSERT INTO Players (p_name, p_game) VALUES (?,?)';
      var data = [
        req.body.name,
        req.body.game
      ];
      connection.query(sql, data, (err, result) => {
        if (err) return done(err);
        const sql = 'SELECT * FROM Players WHERE p_id = LAST_INSERT_ID()';
        connection.query(sql, (err, result) => {
          if (err) return done(err);
          return done(null, result[0]);
        });
      })
    /*
    fetch(`http://${window.location.hostname}:8080/players`,
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(userData)
      })
      .then((res) => {
        res.json()
        console.log(res);
      })
      .then((data) => {
        return done(null, data);
      })
      .catch((err) => {
        return done(err)
      });
     */ 
    }
  ));



  /**
   * Login
   */
  passport.use('local-login', new LocalStrategy({
    // by default, local strategy uses username and password, we will override with email
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true, // allows us to pass back the entire request to the callback
  },
    (req, username, password, done) => { // callback with email and password from our form
      // find a user whose email is the same as the forms email
      // we are checking to see if the user trying to login already exists
      User.findOne({ 'local.username': username }, (err, user) => {
        // if there are any errors, return the error before anything else
        if (err) return done(err);

        // if no user is found, return the message
        if (!user) {
          console.log('no user found');
          return done(null, false, ('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
        }
        // if the user is found but the password is wrong
        if (!user.validPassword(password)) {
          console.log('incorrect password');
          return done(null, false, ('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
        }
        // all is well, return successful user
        return done(null, user);
      });
    }));

};


