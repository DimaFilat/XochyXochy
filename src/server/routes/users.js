/* eslint-disable no-console */
import express from 'express';
import bcrypt from 'bcryptjs';
import { validateBody, schemas } from '../helpers/routeHelpers';
import User from '../model/user';

const router = express.Router();

//  User model

router.get('/sessioncheck', async (req, res) => {
  console.log(req.session);
  if (req.session.user) {
    const { user } = req.session;
    res.json({ user, auth: true });
  } else {
    res.json({ user: {}, auth: false });
  }
});
//  Register Handle
router.route('/reg').post(async (req, res) => {
  console.log(req.body);

  const { name, email, password } = req.body.user;
  //  Validation passed
  const user1 = await User.findOne({ email });
  if (user1) {
    //  User exists
    res.json({ msg: 'Email is already in use' });
  } else {
    const newUser = await new User({
      name,
      email,
      password
    });

    //  Hash Password
    bcrypt.genSalt(10, (error, salt) =>
      bcrypt.hash(newUser.password, salt, async (err, hash) => {
        if (err) throw err;
        //  Set password to hashed
        newUser.password = hash;
        //  Save user
        const user = await newUser.save();
        // console.log(user);
        res.json({ user, auth: true });
      })
    );

    req.session.user = newUser;
  }
});
//  user login
router
  .route('/login')
  .post(validateBody(schemas.authSchema), async (req, res) => {
    console.log(req.body);

    const { email, password } = req.body.user;

    //  Validation passed
    const user = await User.findOne({ email });
    if (!user) {
      //  User exists
      res.json({ auth: false, msg: 'Email or password incorrect' });
    } else {
      // Match password
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
          res.json({ user, auth: true });
        } else {
          res.json({ msg: 'Email or password incorrect' });
        }
      });
      if (req.session.user !== user) {
        req.session.user = user;
      }
    }
  });

router.get('/logout', async (req, res, next) => {
  if (req.session.user && req.cookies.user_sid) {
    try {
      // res.clearCookie('user_sid');
      await req.session.destroy();
      res.json({ msg: 'session been destroyed' });
    } catch (error) {
      next(error);
    }
  } else {
    res.json('/login');
  }
});

module.exports = router;
