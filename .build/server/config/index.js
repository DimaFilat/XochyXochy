'use strict';

if (process.env.NODE_ENV === 'test') {
  module.exports = {
    JWT_SECRET: 'bestGiftsForAll',
    oauth: {
      google: {
        clientID: 'number',
        clientSecret: 'string'
      },
      facebook: {
        clientID: 'number',
        clientSecret: 'string'
      }
    }
  };
} else {
  module.exports = {
    JWT_SECRET: 'bestGiftsForAll',
    oauth: {
      google: {
        clientID: 'number',
        clientSecret: 'string'
      },
      facebook: {
        clientID: 'number',
        clientSecret: 'string'
      }
    }
  };
}