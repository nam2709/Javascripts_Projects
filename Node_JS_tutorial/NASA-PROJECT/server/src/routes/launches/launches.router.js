const express = require('express');
const { 
    httpgetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch,
 } =  require('./launches.controller');

const launchessRouter = express.Router();

launchessRouter.get('/', httpgetAllLaunches);
launchessRouter.post('/', httpAddNewLaunch);
launchessRouter.delete('/:id', httpAbortLaunch);


module.exports = launchessRouter