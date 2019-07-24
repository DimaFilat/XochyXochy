'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _httpProxyMiddleware = require('http-proxy-middleware');

var _httpProxyMiddleware2 = _interopRequireDefault(_httpProxyMiddleware);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _handlebars = require('handlebars');

var _handlebars2 = _interopRequireDefault(_handlebars);

var _redis = require('redis');

var _redis2 = _interopRequireDefault(_redis);

var _connectRedis = require('connect-redis');

var _connectRedis2 = _interopRequireDefault(_connectRedis);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

var _multerGridfsStorage = require('multer-gridfs-storage');

var _multerGridfsStorage2 = _interopRequireDefault(_multerGridfsStorage);

var _gridfsStream = require('gridfs-stream');

var _gridfsStream2 = _interopRequireDefault(_gridfsStream);

var _methodOverride = require('method-override');

var _methodOverride2 = _interopRequireDefault(_methodOverride);

var _default = require('./config/default');

var _default2 = _interopRequireDefault(_default);

var _auth = require('./middleware/auth');

var _index = require('./routes/index');

var _index2 = _interopRequireDefault(_index);

var _users = require('./routes/users');

var _users2 = _interopRequireDefault(_users);

var _gifts = require('./routes/gifts');

var _gifts2 = _interopRequireDefault(_gifts);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// imports for uploading photo(gridfs)
const client = _redis2.default.createClient();

//  import routes
/* eslint-disable no-console */

const app = (0, _express2.default)();

app.use((0, _morgan2.default)('dev'));
// app.use(bodyParser.json());
app.use(_express2.default.json());
app.use(_express2.default.urlencoded({ extended: false }));
app.use((0, _cookieParser2.default)());
app.use(_express2.default.static(_path2.default.join(__dirname, 'public')));

// Middleware for uploading photo(gridfs)
app.use(_bodyParser2.default.json());
app.use((0, _methodOverride2.default)('_method'));

const RedisStore = (0, _connectRedis2.default)(_expressSession2.default);
app.use((0, _expressSession2.default)({
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
}));

app.use(_auth.cookiesCleaner);

//  routes connection
app.use('/', _index2.default);
app.use('/users', _users2.default);
app.use('/gifts', _gifts2.default);

const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost:27017/XochyXochy', {
//   useNewUrlParser: true
// });

// Mongo URI
const mongoURI = 'mongodb://localhost:27017/XochyXochy';

// Create mongo connection
const conn = mongoose.createConnection(mongoURI);

// Init gfs
let gfs;

conn.once('open', () => {
  // Init stream
  gfs = (0, _gridfsStream2.default)(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

// Create storage engine
const storage = new _multerGridfsStorage2.default({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      _crypto2.default.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + _path2.default.extname(file.originalname);
        const fileInfo = {
          filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  }
});
const upload = (0, _multer2.default)({ storage });

// @route GET /upload
// @desc Loads form
// app.get('/upload', (req, res) => {
//   gfs.files.find().toArray((err, files) => {
//     // Check if files
//     if (!files || files.length === 0) {
//       res.render('/upload', { files: false });
//     } else {
//       files.map(file => {
//         if (
//           file.contentType === 'image/jpeg' ||
//           file.contentType === 'image/png'
//         ) {
//           file.isImage = true;
//         } else {
//           file.isImage = false;
//         }
//       });
//       res.render('index', { files: files });
//     }
//   });
// });

// @route POST /upload
// @desc  Uploads file to DB
app.post('/upload', upload.single('file'), (req, res) => {
  // res.json({ file: req.file });
  // res.redirect('/upload');
  console.log(req.body);
  res.status(201).end();
});

// @route GET /files
// @desc  Display all files in JSON
app.get('/files', (req, res) => {
  gfs.files.find().toArray((err, files) => {
    // Check if files
    if (!files || files.length === 0) {
      return res.status(404).json({
        err: 'No files exist'
      });
    }

    // Files exist
    return res.json(files);
  });
});

// @route GET /files/:filename
// @desc  Display single file object
app.get('/files/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists'
      });
    }
    // File exists
    return res.json(file);
  });
});

// @route GET /image/:filename
// @desc Display Image
app.get('/image/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists'
      });
    }

    // Check if image
    if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
      // Read output to browser
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      res.status(404).json({
        err: 'Not an image'
      });
    }
  });
});

// @route DELETE /files/:id
// @desc  Delete file
app.delete('/files/:id', (req, res) => {
  gfs.remove({ _id: req.params.id, root: 'uploads' }, (err, gridStore) => {
    if (err) {
      return res.status(404).json({ err });
    }

    res.redirect('/');
  });
});

app.use(_express2.default.static(_path2.default.join(__dirname, 'public')));

const {
  buildConfig: { assetsDir, targetDir },
  server: { port },
  proxyAssets
} = _default2.default;

if (_default2.default.appModeDev) {
  app.use(`/${assetsDir}`, (0, _httpProxyMiddleware2.default)({
    target: `http://${proxyAssets.host}:${proxyAssets.port}`,
    changeOrigin: true
  }));
} else {
  app.use(`/${assetsDir}`, _express2.default.static(_path2.default.join(process.cwd(), targetDir, 'client')));
}

app.use('*', (req, res) => {
  const template = _handlebars2.default.compile(_fs2.default.readFileSync(_path2.default.join(__dirname, 'index.hbs'), 'utf8'));
  const context = {
    title: 'Express React Skeleton'
  };
  res.send(template(context));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));