const express = require('express');
const routerApi = require('./routes');

const app = express();
const port = 3000;

app.use(express.json());

routerApi(app);

/* app.get('/', (req, res) => {
  res.send('Hola desde mi primer server en express');
});

app.get('/nueva-ruta', (req, res) => {
  res.json([
    {
      name: "product 1",
      price: 1000
    },
    {
      name: "product 2",
      price: 2000
    },
  ]);
});

app.get('/products/:id', (req, res) => {
  const { id } = req.params;
  res.json({
      id,
      name: "product 1",
      price: 1000
  });
});

app.get('/categories/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params;
  res.json({
    categoryId,
    productId
  });
}) */

app.listen(port, () => {
  console.log('Mi port', port);
})
