function cookiesCleaner(req, res, next) {
  console.log('middleware func');
  if (req.cookies.user_sid && !req.session.user) {
    res.clearCookie('user_sid');
  }
  next();
}

const sessionChecker = (req, res, next) => {
  
  if (req.session.user && req.cookies.user_sid) {
    const { user } = req.session;
    res.json(user);
  } else {
    next();
  }
};

module.exports = {
  sessionChecker,
  cookiesCleaner
};
