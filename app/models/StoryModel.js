const mongoose = require('mongoose');

const storySchema = new mongoose.Schema(

);

const StoryModel = mongoose.model("Story", storySchema);
module.exports = StoryModel;