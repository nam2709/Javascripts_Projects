const express = require('express');
const planetsRouter = require('./planets/planets.router.js');
const launchessRouter = require('./launches/launches.router.js');

const api = express.Router();

api.use('/planets', planetsRouter);
api.use('/launches', launchessRouter);

module.exports = api;