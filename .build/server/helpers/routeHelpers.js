'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.schemas = exports.validateBody = undefined;

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const validateBody = exports.validateBody = schema => {
  // eslint-disable-next-line consistent-return
  return (req, res, next) => {
    const result = _joi2.default.validate(req.body.user, schema);
    if (result.error) {
      return res.json(result.error.details);
    }

    if (!req.value) {
      req.value = {};
    }
    req.value.body = result.value;
    next();
  };
};

const schemas = exports.schemas = {
  authSchema: _joi2.default.object().keys({
    email: _joi2.default.string().email().required(),
    password: _joi2.default.string().required().min(3)
  })
};