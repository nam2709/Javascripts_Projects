const express = require('express');
const friendsConfig = require('../controllers/friends.controller.js');

const friendsRouter = express.Router();

friendsRouter.use((req, res, next) => {
    console.log('ip', req.ip);
    next();
});
friendsRouter.get('/alls', friendsConfig.getallfriends);
friendsRouter.post('/', friendsConfig.postFriends);
friendsRouter.get('/:friendID', friendsConfig.getFriends);

module.exports = friendsRouter;