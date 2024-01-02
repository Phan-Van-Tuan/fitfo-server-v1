const mongoose = require('mongoose');

const friendshipSchema = new mongoose.Schema({
    user1: { type: String, required: true },
    user2: { type: String, required: true },
    accepted: { type: Boolean, default: false}
});

const FriendshipModel = mongoose.model('Friendship', friendshipSchema);
module.exports = FriendshipModel;
