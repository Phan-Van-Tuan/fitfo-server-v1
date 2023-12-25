const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    author: { type: String, required: true },
    content: { type: String, required: true },
    postId: { type: String, required: true },
}, { timestamps: true });

const CommentModel = mongoose.model('Comment', commentSchema);

module.exports = CommentModel;
