const path = require('path');

function getMessages(req, res) {
    // res.send('<ul><li>ahdfbadufbadbn</li></ul>');
    res.sendFile(path.join(__dirname, '..', 'public', 'images', 'spiderman.jpg'));
};

function posstMessage(req, res) {
    console.log('Updating message....');
}

module.exports = {
    getMessages, posstMessage
}