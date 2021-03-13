const { Joi } = require("express-validation");

const vOptions = { statusCode: 422, keyByField: true };

module.exports = {
  vOptions: vOptions,

  // voice schema
  voiceSchema: {
    body: Joi.object({
      name: Joi.string().min(2).max(128).required(),
      from: Joi.string().required(),
      to: Joi.string().required(),
      duration: Joi.string().required(),
    }),
  },
};
