const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');

const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler } = require('./middelwares/error.handler');


const app = express();
const port = 3000;

app.use(express.json());

const whitelist = ['http://localhost:8080', 'https://myapp.pe'];
const options = {
  origin: (origin, callback) => {
    if(!origin) return callback(null, true);
    if (whitelist.includes(origin)) {
      callback(null, true);
    }else{
      callback(new Error('no permitido'));
    }
  }
}
app.use(cors(options));// inside cors set options

routerApi(app);

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log('Mi port', port);
})
