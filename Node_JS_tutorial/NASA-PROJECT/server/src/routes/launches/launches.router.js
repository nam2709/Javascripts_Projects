const express = require('express');
const { 
    getAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch,
 } =  require('./launches.controller');

const launchessRouter = express.Router();

launchessRouter.get('/', getAllLaunches);
launchessRouter.post('/', httpAddNewLaunch);
launchessRouter.delete('/:id', httpAbortLaunch);


module.exports = launchessRouter