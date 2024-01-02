const StoryModel = require('../models/StoryModel');
const UserModel = require('../models/UserModel');

class StoryController {
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
            const storiesWithUserInfo = await Promise.all(stories.map(async story => {
                const user = await UserModel.findById(story.author);
                return {
                    _id: story._id,
                    author: story.author,
                    photo: story.photo,
                    userName: user.name,
                    avatar: user.avatar,
                };
            }));
            res.status(200).json(storiesWithUserInfo);
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