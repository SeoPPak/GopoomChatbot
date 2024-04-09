const express = require('express');

const PORT = 8080;
const HOST = '0.0.0.0';
const app = express();
const logger = require('morgan');
const addEvent = require('./routes/addEvent');

const apiRouter = express.Router();

app.use(logger('dev', {}));
app.use(express.json());
app.use('/api', apiRouter);

console.log('routes/index excuted');

module.exports = apiRouter;