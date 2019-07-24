'use strict';

const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const GooglePlusTokenStrategy = require('passport-google-plus-token');
const { ExtractJwt } = require('passport-jwt');
const { JWT_SECRET } = require('./config/index');
const User = require('./model/user');

//  JSON WEB TOKEN STRATEGY
passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: JWT_SECRET
}, async (payload, done) => {
  try {
    //  Find users specified token
    const user = await User.findById(payload.sub);

    //  If user doesn't exits, handel it
    if (!user) {
      return done(null, false);
    }
    //  Otherwise, return the user
    done(null, user);
  } catch (error) {
    done(error, false);
  }
}));

//  GOOGLE OAUTH STRATEGY
passport.use(new GooglePlusTokenStrategy({
  clientId:
  // eslint-disable-next-line max-len
  '738999650116-rqmt0fmcgjbvu40in2nrt5en8kvim85g.apps.googleusercontent.com',
  clientSecret: 'gaNHrpQlntwpkPyQUWxasoS7'
}, async (accessToken, refreshToken, profile, done) => {
  try {
    //  Check whenether this current user exists in our DB
    const existingUser = await User.findOne({ 'google.id': profile.id });
    if (existingUser) {
      return done(null, existingUser);
    }
    //  If new account
    const newUser = new User({
      method: 'google',
      google: {
        id: profile.id,
        email: profile.emails[0].value
      }
    });
    await newUser.save();
    done(null, newUser);
  } catch (error) {
    done(error, false, error.message);
  }
}));

//  LOCAL STRATEGY
passport.use(new LocalStrategy({
  usernameField: 'email'
}, async (email, password, done) => {
  try {
    //  Find User given the email
    const user = await User.findOne({ email });
    //  If not, handle it
    if (!user) {
      return done(null, false);
    }
    //  Check if the passpot is correct
    const isMatch = await user.isValidPassword(password);
    if (isMatch) {
      return done(null, false);
    }
    //  Otherwise, return the user
    done(null, user);
  } catch (error) {
    done(error, false);
  }
}));