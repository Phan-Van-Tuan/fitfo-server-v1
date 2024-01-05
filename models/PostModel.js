const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  author: { type: String, required: true },
  caption: { type: String },
  action: { type: String, required: true },
  like: { type: Array, default: [] },
  photo: { type: String },
}, {
  timestamps: true,
});

const PostModel = mongoose.model('Post', postSchema);

module.exports = PostModel;
