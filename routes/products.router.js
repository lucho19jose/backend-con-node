const express = require('express');
const { faker } = require('@faker-js/faker');

const router = express.Router();

router.get('/', (req, res) => {
  const products = [];
  const { size } = req.query;/* http://localhost:3000/products?size=100 */
  const limit = size || 10;
  for(let index = 0; index < limit; index++){
    products.push({
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
      });
  }
  res.json(products);
});

router.get('/filter', (req, res) => {
  res.send('Yo soy un filter');
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  if (id === '999') {
    res.status(404).json({
      message: 'not found'
    })
  }else {
    res.json({
      id,
      name: 'Product 1',
      price: 2000
    })
  }
});

router.post('/', (req, res) => {
  const body = req.body;
  let nice = {
    name: 'good'
  }
  res.status(201).json({
    message: 'created',
    data: 'holy moly',
    mmm: body,
    nice
  });
})

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  res.json({
    message: 'update',
    data: body,
    id
  })
})

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    message: 'deleted',
    id
  })
})

module.exports = router
