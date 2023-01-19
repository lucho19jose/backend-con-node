const Joi = require('joi');

const userId = Joi.string().uuid();
const user = Joi.string().min(3);
const email = Joi.string().email({ tlds: { allow: false } });
const password = Joi.string().min(4);

const createUserSchema = Joi.object({
  user: user.required(),
  email: email.required(),
  password: password.required(),
});

const updateUserSchema = Joi.object({
  user: user,
  email: email,
  password: password,
});

const getUserSchema = Joi.object({
  id: userId.required(),
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema };
