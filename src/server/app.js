/* eslint-disable no-console */
import fs from 'fs';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import proxy from 'http-proxy-middleware';
import morgan from 'morgan';
import handlebars from 'handlebars';
import redis from 'redis';
import connectRedis from 'connect-redis';
import { cookiesCleaner } from './middleware/auth';
import config from './config/default';

//  import routes

import indexRouter from './routes/index';
import usersRouter from './routes/users';
import giftsRouter from './routes/gifts';

const client = redis.createClient();
const app = express();

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const RedisStore = connectRedis(session);
app.use(
  session({
    store: new RedisStore({
      client,
      host: 'localhost',
      port: 6379,
      ttl: 2600000
    }),
    key: 'user_sid',
    secret: 'anything here',
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 90000000
    }
  })
);

app.use(cookiesCleaner);

//  routes connection
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/gifts', giftsRouter);

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/XochyXochy', {
  useNewUrlParser: true
});

app.use(express.static(path.join(__dirname, 'public')));

const {
  buildConfig: { assetsDir, targetDir },
  server: { port },
  proxyAssets
} = config;

if (config.appModeDev) {
  app.use(
    `/${assetsDir}`,
    proxy({
      target: `http://${proxyAssets.host}:${proxyAssets.port}`,
      changeOrigin: true
    })
  );
} else {
  app.use(
    `/${assetsDir}`,
    express.static(path.join(process.cwd(), targetDir, 'client'))
  );
}

app.use('*', (req, res) => {
  const template = handlebars.compile(
    fs.readFileSync(path.join(__dirname, 'index.hbs'), 'utf8')
  );
  const context = {
    title: 'Express React Skeleton'
  };
  res.send(template(context));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
