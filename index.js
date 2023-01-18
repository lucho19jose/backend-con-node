const express = require('express');
const routerApi = require('./routes');

const { logErrors, errorHandler, boomErrorHandler } = require('./middelwares/error.handler');
const { use } = require('./routes/products.router');

const app = express();
const port = 3000;

app.use(express.json());

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log('Mi port', port);
})
