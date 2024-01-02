const PostModel = require('../models/PostModel');
const UserModel = require('../models/UserModel');
const FriendshipModel = require('../models/FriendshipModel');

class PostController {
    async getAllPosts(req, res) {
        try {
            const myId = req.params.myId;

            // get friendship list
            const friendIds = await FriendshipModel.find({
                $or: [{ user1: myId, accepted: true }, { user2: myId, accepted: true }]
            });
            // get userIds from model friendship and convert to array just id
            const userIds = friendIds.flatMap(friend => [friend.user1, friend.user2]);
            // remove Ids is same each other
            const uniqueUserIds = [...new Set(userIds)];

            console.log(uniqueUserIds);

            // get post have author same id from uniqueUserIds
            const posts = await Promise.all(uniqueUserIds.map(async (userId) => {
                const userPosts = await PostModel.find({ author: userId });
                return userPosts
            }));

            console.log(posts);


            // return post with informatiopn
            const postsWithUserInfo = posts.flatMap(postArray => {
                return postArray.map(post => {
                    const user = UserModel.findById(post.author)

                    return {
                        _id: post._id,
                        author: post.author,
                        userName: user ? user.name : '',
                        avatar: user ? user.avatar : '',
                        caption: post.caption,
                        action: post.action,
                        like: post.like,
                        comment: post.comment,
                        photo: post.photo,
                    };
                });
            });

            res.json(postsWithUserInfo);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getPostsByUser(req, res) {
        const userId = req.params.userId;
        try {
            const posts = await PostModel.find({ author: userId });
            res.json(posts);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async createPost(req, res) {
        const { author, caption, action, like, photo } = req.body;

        try {
            const newPost = new PostModel({ author, caption, action, like, photo });
            await newPost.save();
            res.status(200).json("Post created successfully");
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updatePost(req, res) {
        const { author, caption, action, like, photo } = req.body;
        try {
            await PostModel.findByIdAndUpdate(req.params.postId, { author, caption, action, like, photo }, { new: true });
            res.status(200).json("Post updated successfully");
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async deletePost(req, res) {
        try {
            await PostModel.findByIdAndDelete(req.params.postId);
            res.status(200).json("Post deleted successfully");
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new PostController();
