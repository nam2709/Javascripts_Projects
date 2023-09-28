const express = require('express');
const path = require('path');
const cors = require('cors');
const depreciationperiodRouter = require('./routes/depreciationperiod/depreciationperiod.router.js');
// const launchessRouter = require('./routes/launches/launches.router.js');

const app = express();
const morgan = require('morgan');

app.use(cors({
    origin: 'http://localhost:3000',
}));
app.use(morgan('combined'))

app.use(express.json());
// app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/depreciationperiod', depreciationperiodRouter);
// app.use('/launches', launchessRouter);

app.get('/', (req, res) => {
    res.send(`Performance example: ${process.pid}`);
});

module.exports = app;