'use strict';

exports.checkUser = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    const page = req.params[0].replace(/\//g, '');
    console.log(req.query.id);
    res.redirect(`/createuser?id=${req.query.id}&page=${page}`);
  }
}