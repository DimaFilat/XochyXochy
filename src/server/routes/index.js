import express from 'express';
const User = require('../model/user');
const WishItem = require('../model/wishItem');
const faker = require('faker');
const router = express.Router();

// router.get('/', async (req, res) => {
//Please do step by step

//   //Seed Users step1
//     for (let index = 0; index < 20; index++) {
//       let newUser = new User({
//         name: faker.name.findName(),
//         email: faker.internet.email(),
//         password: faker.internet.password(),
//         img: 'Photo',
//         celebrationDate: faker.date.future()
//       //   wishList should be added later
//       });
//       await newUser.save();
//       console.log(newUser);
//     }

//   //Seed wish list items step2
//     for (let index = 0; index < 100; index++) {
//       let newWishItem = new WishItem({
//         title: faker.commerce.product(),
//         img: 'Photo',
//         rating: Math.floor(Math.random() * 5 + 1),
//         price: faker.commerce.price(),
//         description: faker.lorem.text(),
//         //messenger will be added later,
//         active: true,
//         reserved: false
//       });
//       await newWishItem.save();
//       console.log(newWishItem);
//     }

// //   Update users. Add items to there wish list step3
//     let users = await User.find();
//     let items = await WishItem.find();
//     for (let i = 0; i < users.length; i++) {
//       users[i].wishItem.push(items[i], items[items.length - i - 1]);
//       // users[i].wishItem.push(i);
//       await users[i].save();
//       console.log(i, users[i].wishItem, users[i].name);
//     }
//   res.end();
// });

export default router;
