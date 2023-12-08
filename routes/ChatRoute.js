const express = require('express');
const router = express.Router();
const ChatController = require('../controllers/ChatController');

// Define routes using the ChatController methods
router.post('/', ChatController.createChat);
router.get('/:id', ChatController.findUserChats);
router.get('/find/:firstId/:secondId', ChatController.findChat);

module.exports = router;