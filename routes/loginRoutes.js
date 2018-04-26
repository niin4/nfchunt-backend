'use strict';
const jwt = require('jsonwebtoken');

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

  app.use('/appsignup', (req, res, next) => {
    passport.authenticate('app-signup', (err, user, info) => {
      if (err) { return next({ err: err, message: 'Error authenticating' }); }
      req.login(user, {session: false}, (err) => {
        console.log('logging in');
        console.log(user);
        if (err) {return next({err: err, message:' Error logging in'}); }
        const token = jwt.sign(JSON.parse(JSON.stringify(user)), `${process.env.NFC_SECRET}`);
        return res.json({token});
    });
    })(req, res, next);
  })

  app.use('/applogin', (req, res, next) => {
    passport.authenticate('app-login', {session: false}, (err, user, info) => {
        console.log(err);
        if (err || !user) {
            return res.status(400).json({
                message: info ? info.message : 'Login failed',
                user   : user
            });
        }
        req.login(user, {session: false}, (err) => {
            if (err) {
                res.send(err);
            }
            const token = jwt.sign(JSON.parse(JSON.stringify(user)), `${process.env.NFC_SECRET}`);
            return res.json({token});
        });
    })
    (req, res);
});

app.use('/protected', passport.authenticate('jwt', {session: false}), (req, res, next) => {
  res.json({message: 'success'});
})

};


