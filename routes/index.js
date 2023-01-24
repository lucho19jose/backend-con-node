const express = require("express");
const productsRouter = require('./products.router');
const usersRouter = require('./users.router');
const customersRouter = require('./customers.route');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/products', productsRouter);
  router.use('/users', usersRouter)
  //app.use('/categories', productsRouter)
  router.use('/customers', customersRouter);
}

module.exports = routerApi;

