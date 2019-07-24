const express = require('express');
const passport = require('passport');
const router = require('express-promise-router')();

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

module.exports = router;
