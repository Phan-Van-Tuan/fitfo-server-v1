const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
    author: { type: String, required: true },
    photo: { type: String },
}, {
    timestamps: true,
    expires: 24 * 60 * 60,
});

const StoryModel = mongoose.model("Story", storySchema);
module.exports = StoryModel;