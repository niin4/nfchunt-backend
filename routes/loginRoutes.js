'use strict';
const jwt = require('jsonwebtoken');

module.exports = (app, passport) => {

  app.use('/signup', (req, res, next) => {
    passport.authenticate('local-signup', (err, user, info) => {
      if (err) { return next({ err: err, message: 'Error authenticating' }); }
      if (!user) { return res.redirect('/'); }
      req.logIn(user, (err) => {
        if (err) { return next({ err: err, message: 'Error logging in' }) }
        res.redirect('/' + req.session.redirect);
        res.end();
      });
    })(req, res, next);
  })

  app.use('/login', (req, res, next) => {
    passport.authenticate('local-login', (err, user, info) => {
      if (err) { return next({ err: err, message: 'Error authenticating' }); }
      if (!user) { return res.redirect('/'); }
      req.logIn(user, (err) => {
        if (err) { return next({ err: err, message: 'Error logging in' }) }
        res.redirect('/' + req.session.redirect);
        res.end();
      });
    })(req, res, next);
  })

  /**
  * @api {post} /appsignup Register user
  * @apiName RegisterUser
  * @apiGroup Users
  * @apiDescription Register user for creating, updating and deleting games. JWT access token returned as callback.
  * 
  * @apiParam {String} username Username
  * @apiParam {String} password Password
  *  
  * @apiSuccessExample Success-Response:
  *  HTTP  /1.1 200 OK
  *  {
  *    "token": "xyz123"
  *  }
  * @apiError (500 Internal server error) DatabaseError Problem inserting data.
  */
  app.use('/appsignup', (req, res, next) => {
    passport.authenticate('app-signup', (err, user, info) => {
      if (err) { return next({ err: err, message: 'Error authenticating' }); }
      req.login(user, { session: false }, (err) => {
        if (err) { return next({ err: err, message: ' Error logging in' }); }
        const token = jwt.sign(JSON.parse(JSON.stringify(user)), `${process.env.NFC_SECRET}`);
        return res.json({ token });
      });
    })(req, res, next);
  })

/**
* @api {post} /appslogin Log in user
* @apiName LoginUser
* @apiGroup Users
* @apiDescription Log in user. JWT access token returned as callback
* 
* @apiParam {String} username Username
* @apiParam {String} password Password
*  
* @apiSuccessExample Success-Response:
*  HTTP  /1.1 200 OK
*  {
*    "token": "xyz123"
*  }
* @apiError (500 Internal server error) DatabaseError Problem fetching data.
*/
  app.use('/applogin', (req, res, next) => {
    passport.authenticate('app-login', { session: false }, (err, user, info) => {
      if (err || !user) {
        return res.status(400).json({
          message: info ? info.message : 'Login failed',
          user: user
        });
      }
      req.login(user, { session: false }, (err) => {
        if (err) {
          res.send(err);
        }
        const token = jwt.sign(JSON.parse(JSON.stringify(user)), `${process.env.NFC_SECRET}`);
        return res.json({ token });
      });
    })
      (req, res);
  });


};


