import Joi from 'joi';

export const validateBody = schema => {
  // eslint-disable-next-line consistent-return
  return (req, res, next) => {
    const result = Joi.validate(req.body.user, schema);
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

export const schemas = {
  authSchema: Joi.object().keys({
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .required()
      .min(3)
  })
};
