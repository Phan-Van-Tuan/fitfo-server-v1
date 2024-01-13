const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
    author: { type: String, required: true },
    photo: { type: String },
    createdAt: { type: Date, expires: 24 * 60 * 60, default: Date.now }
}, {
    timestamps: true,
});

const StoryModel = mongoose.model("Story", storySchema);
module.exports = StoryModel;