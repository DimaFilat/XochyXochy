'use strict';

const cookiesCleaner = (req, res, next) => {
  console.log('middleware func');
  if (req.cookies.user_sid && !req.session.user) {
    res.clearCookie('user_sid');
  }
  next();
};

const sessionChecker = (req, res, next) => {
  if (req.session.user && req.cookies.user_sid) {
    res.redirect('/todo');
  } else {
    next();
  }
};

const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticate()) {
    return next();
  }
  res.json({ msg: 'no session' });
};
module.exports = {
  ensureAuthenticated,
  sessionChecker,
  cookiesCleaner
};