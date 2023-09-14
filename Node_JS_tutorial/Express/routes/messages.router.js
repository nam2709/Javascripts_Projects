const express = require('express');
const messagesConfig = require('../controllers/messages.controller.js');

const messagesRouter = express.Router();

messagesRouter.get('/', messagesConfig.getMessages);
messagesRouter.post('/', messagesConfig.posstMessage);

module.exports = messagesRouter;