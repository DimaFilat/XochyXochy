'use strict';

/* eslint-disable func-names */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
// Mongo URI
const mongoURI = 'mongodb://localhost:27017/XochyXochy';

// Create mongo connection
const conn = mongoose.createConnection(mongoURI);

const userSchema = new mongoose.Schema({
  method: {
    type: String,
    enum: ['local', 'google', 'facebook']
  },
  loacal: {
    email: {
      type: String,
      lowercase: true
    },
    password: {
      type: String
    }
  },
  google: {
    id: { type: String },
    email: {
      type: String,
      lowercase: true
    }
  },
  facebook: {
    id: { type: String }
  },
  name: {
    type: String,
    required: true
  },
  img: String,
  celebrationDate: [{
    title: String,
    date: Date,
    cycle: false
  }],
  wishItem: []
});

userSchema.pre('save', async function (next) {
  try {
    if (this.method !== 'local') {
      next();
    }

    // the user schema is instantiated
    const user = this;

    // check if the user has been modified
    // to know if the password has already been hashed
    if (!user.isModified('local.password')) {
      next();
    }

    //  Genrate a salt
    const salt = await bcrypt.genSalt(10);

    //  Generate a password hash (salt+hash)
    const passwordHash = await bcrypt.hash(this.local.password, salt);

    //  Re-assign hashed version over original, plain text password
    this.local.password = passwordHash;
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.isValidPassword = async function (newPassword) {
  try {
    return await bcrypt.compare(newPassword, this.local.password);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = conn.model('User', userSchema);