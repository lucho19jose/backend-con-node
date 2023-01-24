const express = require('express');

const CustomerService = require('../services/customers.service');

//const validationHandler = require('../utils/middlewares/validation');
const validatorHandler = require('../middelwares/validator.handler');

const { createCustomerSchema, updateCustomerSchema, getCustomerSchema,  } = require('./../schemas/customer.schema');

const router = express.Router();

const service = new CustomerService();

router.get('/', async (req, res, next) => {
  try {
    res.json(await service.find());
  } catch (error) {
    next(error)
  }
});

router.get('/:id',
  validatorHandler(getCustomerSchema, 'params'),
  async (req, res) => {
    const { id } = req.params;
    const customer = await service.findOne(id);
    res.json(customer)
  }
);

router.post('/',
  validatorHandler(createCustomerSchema, 'body'),
  async (req ,res, next) => {
    try {
      const body = req.body;
      res.json(body);
      const newCustomer = service.create(body);
      res.status(201).json(newCustomer);

    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  validatorHandler(getCustomerSchema, 'params'),
  validatorHandler(updateCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const updatedCustomer = service.update(id, body);
      res.json(updatedCustomer);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
  validatorHandler(getCustomerSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const rta = service.delete(id);
      res.json(rta);

    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
