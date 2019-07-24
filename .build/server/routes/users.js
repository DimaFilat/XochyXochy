'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _user = require('../model/user');

var _user2 = _interopRequireDefault(_user);

var _auth = require('../middleware/auth');

var _auth2 = _interopRequireDefault(_auth);

var _ozonParser = require('../ozonParser/ozonParser');

var _ozonParser2 = _interopRequireDefault(_ozonParser);

var _ozonPictureDownloader = require('../ozonParser/ozonPictureDownloader');

var _ozonPictureDownloader2 = _interopRequireDefault(_ozonPictureDownloader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { validateBody, schemas } from '../helpers/routeHelpers';
/* eslint-disable no-console */
const router = _express2.default.Router();

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
  const user1 = await _user2.default.findOne({ email });
  if (user1) {
    //  User exists
    res.json({ msg: 'Email is already in use' });
  } else {
    const newUser = await new _user2.default({
      name,
      email,
      password,
      img: 'https://image.flaticon.com/icons/png/512/149/149071.png'
    });

    //  Hash Password
    _bcryptjs2.default.genSalt(10, (error, salt) => _bcryptjs2.default.hash(newUser.password, salt, async (error, hash) => {
      if (error) throw error;
      //  Set password to hashed
      newUser.password = hash;
      //  Save user
      const user = await newUser.save();
      // console.log(user);
      res.json({ user, auth: true });
    }));
    req.session.user = newUser;
  }
});
//  user login
router.route('/login').post(async (req, res) => {
  // console.log(req.body);

  const { email, password } = req.body.user;

  //  Validation passed
  const user = await _user2.default.findOne({ email });
  if (!user) {
    //  User exists
    res.json({ auth: false, msg: 'Email or password incorrect' });
  } else {
    // Match password
    _bcryptjs2.default.compare(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        res.json({ user, auth: true });
        console.log('<<<<<>>>>', user);
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