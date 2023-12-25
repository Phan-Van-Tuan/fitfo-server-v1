const PostModel = require('../models/PostModel');
const UserModel = require('../models/UserModel');

class PostController {
    async getAllPosts(req, res) {
        try {
            // Bước 1: Lấy danh sách bài viết
            const posts = await PostModel.find();

            // Bước 2: Tìm tất cả các idUser trong trường author của mỗi bài viết
            const userIds = posts.map(post => post.author);

            // Bước 3: Sử dụng danh sách idUser để lấy thông tin avatar và name từ model User
            const users = await UserModel.find({ _id: { $in: userIds } });

            // Bước 4: Gộp thông tin người dùng vào mỗi bài viết
            const postsWithUserInfo = posts.map(post => {
                const user = users.find(user => user._id.toString() === post.author);
                return {
                    _id: post._id,
                    author: post.author,
                    userName: user.name,
                    avatar: user.avatar,
                    caption: post.caption,
                    action: post.action,
                    like: post.like,
                    comment: post.comment,
                    photo: post.photo,
                };
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
