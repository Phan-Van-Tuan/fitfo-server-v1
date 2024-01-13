const express = require('express');
const router = express.Router();
const PostController = require('../controllers/PostController');

router.post('/', PostController.createPost);
router.delete('/:postId', PostController.deletePost);
router.put('/:postId', PostController.updatePost);
router.get('/getAll/:myId', PostController.getAllPosts);
router.get('/getByUser/:userId', PostController.getPostsByUser);
router.patch('/like/:postId', PostController.updatePostLikes);

module.exports = router;