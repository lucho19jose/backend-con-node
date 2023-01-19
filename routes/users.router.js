const express = require("express");

const UserService = require('./../services/user.service');
const validatorHandler = require('./../middelwares/validator.handler');

const { createUserSchema, updateUserSchema, getUserSchema } = require('./../schemas/user.schema');

const router = express.Router();

const service = new UserService();

router.get('/', async (req, res) => {
  const users = await service.find();
  res.json(users);
});

router.get('/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await service.findOne(id);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newUser = await service.create(body);
      res.status(201).json(newUser);

    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const userModified = await service.update(id, body);
      res.json(userModified);

    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const rta = await service.delete(id);
    res.json(rta);

  } catch (error) {
    res.status(404).json({
      message: error.message
    });
  }
});

module.exports = router
