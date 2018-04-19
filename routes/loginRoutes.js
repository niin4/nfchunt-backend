'use strict';

module.exports = (app, passport) => {

  app.use('/signup', (req, res, next) => {
    passport.authenticate('local-signup', (err, user, info) => {
      if (err) { return next({ err: err, message: 'Error authenticating' }); }
      if (!user) { return res.redirect('/'); }
      req.logIn(user, (err) => {
        if (err) { return next({ err: err, message: 'Error logging in' }) }
        console.log('redirecting to ' + req.session.redirect);
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
        console.log('redirecting to ' + req.session.redirect);
        res.redirect('/' + req.session.redirect);
        res.end();
      });
    })(req, res, next);
  })

};


