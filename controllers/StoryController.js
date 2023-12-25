const StoryModel = require('../models/StoryModel');

class StoryController {
    // single chat
    async createStory(req, res) {
        const { author, photo } = req.body;

        const story = new StoryModel({
            author,
            photo
        });

        try {
            const response = await story.save();
            res.status(200).json(response);
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    }

    async getStories(req, res) {
        try {
            const stories = await StoryModel.find();
            res.status(200).json(stories);
        } catch (error) {
            console.error(error);
            res.status(500).json(error);
        }
    }

    async getStory(req, res) {
        const storyId = req.params.id
        try {
            const stories = await StoryModel.findById(storyId);
            res.status(200).json(stories);
        } catch (error) {
            console.error(error);
            res.status(500).json(error);
        }
    }
}

module.exports = new StoryController;