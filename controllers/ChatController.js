const ChatModel = require('../models/ChatModel');

class ChatController {
    async createChat(req, res) {
        const { firstId, secondId } = req.body
        try {
            const chat = await ChatModel.findOne({
                members: { $all: [firstId, secondId] }
            });
            if (chat) return res.status(200).json(chat);

            const newChat = new ChatModel({
                members: [firstId, secondId]
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
