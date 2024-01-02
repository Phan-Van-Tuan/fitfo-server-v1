const CommentModel = require('../models/CommentModel');
const UserModel = require('../models/UserModel');


class CommentController {
    async getCommentsByPostId(req, res) {
        try {
            const comments = await CommentModel.find({ postId: req.params.postId });
            const userIds = comments.map(comment => comment.author);
            const users = await UserModel.find({ _id: { $in: userIds } });
            const commentWithUserInfo = comments.map(comment => {
                const user = users.find(user => user._id.toString() === comment.author);
                return {
                    _id: comment._id,
                    author: comment.author,
                    content: comment.content,
                    postId: comment.postId,
                    avatar: user.avatar,
                    userName: user.name,
                }
            });
            res.status(200).json(commentWithUserInfo);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async createComment(req, res) {
        const { author, content } = req.body;
        const postId = req.params.postId;

        try {
            const newComment = new CommentModel({ author, content, postId });
            await newComment.save();
            res.status(200).json("Comment created successfully");
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateComment(req, res) {
        const { author, content } = req.body;
        try {
            await CommentModel.findByIdAndUpdate(req.params.commentId, { author, content }, { new: true });
            res.status(200).json("Comment updated successfully");
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async deleteComment(req, res) {
        try {
            await CommentModel.findByIdAndDelete(req.params.commentId);
            res.status(200).json("Comment deleted successfully");
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new CommentController;

