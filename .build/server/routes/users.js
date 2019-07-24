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

module.exports = router;