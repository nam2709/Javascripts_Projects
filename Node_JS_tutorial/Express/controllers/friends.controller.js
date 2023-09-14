const model = require('../models/friends.models.js');

function getallfriends(req, res) {
    res.json(model);
};

function postFriends(req, res) {
    if (!req.body.name){
        return res.status(404).json({
            error: 'Missing friebnd name',
        });
    } // return khien dong duoi ko chay nua

    const newFriend = {
        name: req.body.name,
        id: model.friends.length
    }
    model.friends.push(newFriend);

    res.json(newFriend);
}

function getFriends(req, res) {
    const friendID = Number(req.params.friendID);
    const friend = model.friends[friendID];
    if (friend) {
        res.status(200).json(friend);
    } else {
        res.status(404).json({
            error: "Friend does not exist"
        });
    }
}

module.exports = {
    postFriends, getFriends, getallfriends
}