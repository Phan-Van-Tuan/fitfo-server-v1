const MessageModel = require('../models/MessageModel');

class MessageController {
    async createMessage(req, res) {
        const { chatId, senderId, text } = req.body;

        const message = new MessageModel({
            chatId,
            senderId,
            text,
        });

        try {
            const response = await message.save();
            res.status(200).json(response);
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    }

    async getMessage(req, res) {
        const chatId = req.params.id;
        try {
            const message = await MessageModel.findById(chatId);
            res.status(200).json(message);
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    }

}

module.exports = new MessageController;