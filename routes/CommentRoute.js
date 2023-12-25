const express = require('express');
const router = express.Router();
const CommentController = require('../controllers/CommentController');

// Define routes using the ChatController methods
router.post('/:postId', CommentController.createComment);
router.get('/:postId', CommentController.getCommentsByPostId);
router.delete('/:commentId', CommentController.deleteComment);
router.put('/:commentId', CommentController.updateComment);

module.exports = router;