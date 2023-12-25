const ChatModel = require('../models/ChatModel');
const UserModel = require('../models/UserModel');

class ChatController {
    // single chat
    async createChat(req, res) {
        const { firstId, secondId } = req.body
        try {
            const chat = await ChatModel.findOne({
                members: { $all: [firstId, secondId] }
            });
            if (chat) return res.status(200).json(chat);

            const user = await UserModel.findById(secondId);

            const newChat = new ChatModel({
                members: [firstId, secondId],
                chatName: user.name,
                chatAvatar: user.avatar,
            });

            const response = await newChat.save();

            res.status(200).json(response);
        } catch (error) {
            console.error(error);
            res.status(500).json(error);
        }
    }

    async findUserChats(req, res) {
        const userId = req.params.userId;
        try {
            const chats = await ChatModel.find({
                members: { $in: [userId] }
            });
            res.status(200).json(chats);
        } catch (error) {
            console.error(error);
            res.status(500).json(error);
        }
    }

    async findChat(req, res) {
        const { firstId, secondId } = req.params;
        try {
            const chat = await ChatModel.find({
                members: { $all: [firstId, secondId] }
            });
            res.status(200).json(chat);
        } catch (error) {
            console.error(error);
            res.status(500).json(error);
        }
    }

    async findChatById(req, res) {
        const chatId = req.params.chatId;
        try {
            const chat = await ChatModel.findById(chatId);
            res.status(200).json(chat);
        } catch (error) {
            console.error(error);
            res.status(500).json(error);
        }
    }
}

module.exports = new ChatController;
