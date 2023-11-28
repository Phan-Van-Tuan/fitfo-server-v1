const express = require('express');
const router = express.Router();
const MessageController = require('../controllers/MessageController');

// Define routes using the MessageController methods
router.post('/', MessageController.createMessage);
router.get('/:id', MessageController.getMessage);

module.exports = router;