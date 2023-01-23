const Joi = require('joi');

const userId = Joi.string();
//const user = Joi.string().min(3);
const email = Joi.string().email({ tlds: { allow: false } });
const password = Joi.string().min(4);
// const role = Joi.string().min(5);

const createUserSchema = Joi.object({
  //user: user.required(),
  email: email.required(),
  password: password.required(),
  //role: role.required()
});

const updateUserSchema = Joi.object({
  //user: user,
  email: email,
  //password: password,
  //role: role,
});

const getUserSchema = Joi.object({
  id: userId.required(),
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema };
