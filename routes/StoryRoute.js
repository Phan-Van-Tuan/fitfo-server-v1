const express = require('express');
const router = express.Router();
const StoryController = require('../controllers/StoryController');

router.post('/', StoryController.createStory);
router.get('/', StoryController.getStories);
router.get('/:id', StoryController.getStory);

module.exports = router;