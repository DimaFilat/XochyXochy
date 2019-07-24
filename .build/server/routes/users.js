'use strict';


const express = require('express');
const passport = require('passport');
const router = require('express-promise-router')();

const { validateBody, schemas } = require('../helpers/routeHelpers');
const UsersController = require('../controllers/users');
const passportConf = require('../passport');

const passportSignIn = passport.authenticate('local', { session: false });
const passportJWT = passport.authenticate('jwt', { session: false });
const passportGoggle = passport.authenticate('googleToken', { session: false });

//  SignUP Router
router.route('/signup').post(UsersController.signUp);

//  Login Router
router.route('/signin').post(passportSignIn, UsersController.signIn);

// Get Secret Router
router.route('/secret').get(passportSignIn, UsersController.secret);

//  Google OAuth
router.route('/oauth/google').post(passportGoggle, UsersController.googleOAuth);

// LogOut Router
router.get('/logout', async (req, res, next) => {
  if (req.session.user && req.cookies.user_sid) {
    try {
      res.clearCookie('user_sid');
      await req.session.destroy();
      res.json({ user: {}, auth: false });
    } catch (error) {
      next(error);
    }
  } else {
    res.redirect('/login');
  }
});

router.post('/profile/:id/newCelebration', async (req, res) => {
  // console.log('ruchka', req.body, 'session ====>', req.session);
  const { _id } = req.session.user;
  const { celebrationDate, celebrationTitle } = req.body;
  // await User.findOneAndUpdate(
  //   { _id },
  //   {
  //     $push: {
  //       celebrationDate: {
  //         title: celebrationTitle,
  //         date: celebrationDate
  //       }
  //     }
  //   }
  // );
  const user = await _user2.default.findOne({ _id });
  req.session.user = user;
  res.json(user);
});

router.post('/ozonParser', async (req, res) => {
  console.log(req.body);
  const scrapeFunc = await (0, _ozonParser2.default)(req.body.url);
  await (0, _ozonPictureDownloader2.default)(req.body.url);
  // console.log(scrapeFunc);
  res.json(scrapeFunc);
});

module.exports = router;