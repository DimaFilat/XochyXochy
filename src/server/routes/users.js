/* eslint-disable no-console */
import express from 'express';
import bcrypt from 'bcryptjs';
// import { validateBody, schemas } from '../helpers/routeHelpers';
import User from '../model/user';
import scrape from '../ozonParser/ozonParser';
import imageParser from '../ozonParser/ozonPictureDownloader';
import scrapeAndParser from '../ozonParser/scrapeAndParser';

const router = express.Router();

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
router.route('/signup').post(async (req, res) => {
  console.log(req.body);

  const { name, email, password } = req.body;
  //  Validation passed
  const user1 = await User.findOne({ email });
  if (user1) {
    //  User exists
    res.json({ auth: false, msg: 'Email is already registred' });
  } else {
    const newUser = await new User({
      name,
      email,
      password
    });

    //  Hash Password
    bcrypt.genSalt(10, (err, salt) =>
      bcrypt.hash(newUser.password, salt, async (err, hash) => {
        if (err) throw err;
        //  Set password to hashed
        newUser.password = hash;
        //  Save user
        const user = await newUser.save();

        res.json({ user, auth: true });
      })
    );

    req.session.user = newUser;
  }
});
//  user login
router
  .route('/signin')

  .post(async (req, res) => {
    console.log(req.body);

    const { email, password } = req.body;

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
          res.json({ auth: false, msg: 'Email or password incorrect' });
        }
      });
      if (req.session.user !== user) {
        req.session.user = user;
      }
    }
  });

router.get('/signout', async (req, res, next) => {
  if (req.session.user && req.cookies.user_sid) {
    try {
      await res.clearCookie('user_sid');
      await req.session.destroy();
      res.json({ auth: false });
    } catch (error) {
      next(error);
    }
  }
});
//   add Users  auction
// router
//   .route('/profile/addAuction')
//   .get((req, res) => {
//     res.render('auction');
//   })

//   .post(async (req, res) => {
//     const id = req.session.user._id;
//     const { name, condition, start, ends, description } = req.body;
//     const auction = await new Auctions({
//       name,
//       condition,
//       start,
//       ends,
//       description,
//       userID: id
//     });
//     const user = await User.findOne({ _id: id });
//     user.auctions.push(auction);
//     await user.save();
//     res.json(user);
//     console.log(user);
//   });

// // Update Delete auctions
// router
//   .route('/profile/auction/:id')
//   .get(async (req, res) => {
//     const { id } = req.params;
//     const userID = req.session.user._id;
//     const user = await User.findOne({ _id: userID });
//     user.auctions.forEach(item => {
//       if (item._id.toString() === id) {
//         res.json(item);
//       }
//     });
//   })
//   .put(async (req, res) => {
//     const { _id, name, condition, start, ends, description, userID } = req.body;
//     const auctionUpdate = await new Auctions({
//       name,
//       condition,
//       start,
//       ends,
//       description,
//       userID
//     });

//     const userId = req.session.user._id;
//     const user = await User.findOne({ _id: userId });
//     user.auctions.forEach((item, i) => {
//       if (item._id.toString() === _id) {
//         user.auctions.splice(i, 1);
//         user.auctions.push(auctionUpdate);
//         res.json(user);
//       }
//     });
//     await user.save();
//   })
//   .delete(async (req, res) => {
//     const { id } = req.params;
//     const userId = req.session.user._id;
//     const user = await User.findOne({ _id: userId });
//     user.auctions.forEach((item, i) => {
//       if (item._id.toString() === id) {
//         user.auctions.splice(i, 1);
//         res.json(user);
//       }
//     });
//     await user.save();
// });

router.post('/profile/newCelebration', async (req, res) => {
  console.log('ruchka', req.body);
  const { _id } = req.session.user;
  const { inputCelebrationDate, inputCelebrationTitle } = req.body;
  await User.findOneAndUpdate(
    { _id },
    {
      $push: {
        celebrationDate: {
          title: inputCelebrationTitle,
          date: inputCelebrationDate
        }
      }
    }
  );
  const user = await User.findOne({ _id });
  req.session.user = user;
  res.json(user);
});

router.post('/ozonParser', async (req, res) => {
  console.log(req.body);
  const scrapeFunc = await scrapeAndParser(req.body.url);
  // const picFileName = await imageParser(req.body.url);
  res.json(scrapeFunc);
});

module.exports = router;
