const ChatModel = require('../models/ChatModel');
const UserModel = require('../models/UserModel');
const MessageModel = require('../models/MessageModel');

class ChatController {
    // single chat
    async createChat(req, res) {
        const { firstId, secondId } = req.body
        try {
            const chat = await ChatModel.findOne({
                members: { $all: [firstId, secondId] }
            });
            if (chat) return res.status(200).json(chat);

            const newChat = new ChatModel({
                members: [firstId, secondId],
                chatName: "",
                chatAvatar: "",
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

            const updatedChats = await Promise.all(chats.map(async (chat) => {
                // Kiểm tra số thành viên trong mảng
                let chatObject = chat.toObject()
                if (chat.members.length > 2) {
                    // Nếu có nhiều hơn 2 thành viên
                } else {
                    const otherMemberId = chat.members.find(memberId => memberId != userId);
                    const latestMessage = await MessageModel
                        .findOne({ chatId: chat._id })
                        .sort({ createdAt: -1 })
                        .exec();
                    if (latestMessage) {
                        chatObject.latestSend = latestMessage.createdAt;
                        chatObject.latestMessage = latestMessage.title;
                        chatObject.latestType = latestMessage.type;
                        chatObject.latestSenderId = latestMessage.senderId;
                    }
                    const otherMember = await UserModel.findById(otherMemberId);
                    // Nếu có 2 thành viên
                    if (chat.chatName == "" || chat.chatName == undefined) {
                        // Nếu chatName rỗng, lấy tên của thành viên còn lại
                        chatObject.chatName = otherMember.name;
                    }

                    if (chat.chatAvatar == "" || chat.chatAvatar == undefined) {
                        // Nếu chatAvatar rỗng, lấy avatar của thành viên còn lại
                        chatObject.chatAvatar = otherMember.avatar;
                    }
                }

                return chatObject;
            }));
            res.status(200).json(updatedChats);
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
