const passport = require('passport');
const router = require('express-promise-router')();

/* eslint-disable no-console */
import express from 'express';
import bcrypt from 'bcryptjs';
// import { validateBody, schemas } from '../helpers/routeHelpers';
import User from '../model/user';
import scrape from '../ozonParser/ozonParser';

const { validateBody, schemas } = require('../helpers/routeHelpers');
const UsersController = require('../controllers/users');
const passportConf = require('../passport');

const passportSignIn = passport.authenticate('local', { session: false });
const passportJWT = passport.authenticate('jwt', { session: false });

//  SignUP Router
router
  .route('/signup')
  .post(validateBody(schemas.signSchema), UsersController.signUp);

//  Login Router
router
  .route('/signin')
  .post(
    validateBody(schemas.authSchema),
    passportSignIn,
    UsersController.signIn
  );

// LogOut Router
router.route('/signout').get(UsersController.signOut);

router
  .route('/oauth/google')
  .post(
    passport.authenticate('googleToken', { session: false }),
    UsersController.googleOAuth
  );

router
  .route('/oauth/facebook')
  .post(
    passport.authenticate('facebookToken', { session: false }),
    UsersController.facebookOAuth
  );

router
  .route('/oauth/link/google')
  .post(
    passportJWT,
    passport.authorize('googleToken', { session: false }),
    UsersController.linkGoogle
  );

router
  .route('/oauth/unlink/google')
  .post(passportJWT, UsersController.unlinkGoogle);

router
  .route('/oauth/link/facebook')
  .post(
    passportJWT,
    passport.authorize('facebookToken', { session: false }),
    UsersController.linkFacebook
  );

router
  .route('/oauth/unlink/facebook')
  .post(passportJWT, UsersController.unlinkFacebook);

router.route('/dashboard').get(passportJWT, UsersController.dashboard);

router.route('/status').get(passportJWT, UsersController.checkAuth);

module.exports = router;

router.post('/profile/:id/newCelebration', async (req, res) => {
  console.log('ruchka', req.body, 'session ====>', req.session);
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
  const user = await User.findOne({ _id });
  req.session.user = user;
  res.json(user);
});

router.post('/ozonParser', async (req, res) => {
  console.log(req.body);
  const scrapeFunc = await scrape(req.body.url);
  // console.log(scrapeFunc);
  res.json(scrapeFunc);
});

module.exports = router;
