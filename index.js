const express = require('express');
const PORT = 8080;
const HOST = '0.0.0.0';
const app = express()

const logger = require('morgan');
const addEvent = require('./routes/addEvent');
const test = require('./routes/test');
const filter = require('./routes/filter');

const apiRouter = express.Router();

app.use(logger('dev', {}));
app.use(express.json());
app.use('/api', apiRouter);


app.use('/', apiRouter);
apiRouter.get('/t', (req, res) => {
    res.send('hello world');
    }
)



app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);