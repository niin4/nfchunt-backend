'use strict';

module.exports = (app, passport) => {

   app.use('/signup', (req, res, next) => {
    console.log('body:')
    console.log(req.body);
    
    passport.authenticate('local-signup', (err, user, info) => {
      if (err) { return next({ err: err, message: 'Error authenticating' }); }
      if (!user) { return res.redirect('/'); }
      console.log(user);
      req.logIn(user, (err) => {
        if (err) { return next({ err: err, message: 'Error logging in' }) }
        console.log('redirecting to '+ req.session.redirect);
        res.redirect('/'+ req.session.redirect);
      });
    })(req, res, next);
    
  })
};


