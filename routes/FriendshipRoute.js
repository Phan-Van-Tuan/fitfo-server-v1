const express = require('express');
const router = express.Router();
const FriendshipController = require('../controllers/FriendshipController');

router.post('/addFriend', FriendshipController.addFriend);
router.get('/:userId', FriendshipController.getFriends);
router.delete('/deleteFriend/:friendshipId', FriendshipController.removeFriend);
router.patch('/acceptFriend/:friendshipId', FriendshipController.accceptFriend);
router.get('/:user1Id/:user2Id', FriendshipController.getFriendshipBetweenUsers)

module.exports = router;
