'use strict';

const JWT = require('jsonwebtoken');
const User = require('../model/user');
const { JWT_SECRET } = require('../config/index');

// create token function

const signToken = user => {
  return JWT.sign({
    iss: 'XochyXochy',
    sub: user.id,
    iat: new Date().getTime(), //   current time
    exp: new Date().setDate(new Date().getTime() + 1) //  1 day long
  }, JWT_SECRET);
};

module.exports = {
  signUp: async (req, res, next) => {
    console.log('UsersController.signUp() called');
    console.log('<<<<<<<<<<<<<<<<<<<<<<', req.body.user);

    const { name, email, password } = req.body.user;

    //  check User in db
    const foundUser = await User.findOne({ email });
    if (foundUser) {
      res.status(403).json({ error: 'Email is already in use' });
    }

    //  Create a new user
    const newUser = new User({
      method: 'local',
      local: { email, password },
      name
    });
    await newUser.save();

    //  Generate the token
    const token = signToken(newUser);

    //  respond with JWT
    res.status(200).json({ token });
  },
  signIn: async (req, res, next) => {
    const token = signToken(req.user);
    res.status(200).json({ token });
  },
  googleOAuth: async (req, res, next) => {
    //  Generate token
    const token = signToken(req.user);
    res.status(200).json({ token });
  },
  secret: async (req, res, next) => {
    console.log('UsersController.signUp() called');
  }
};