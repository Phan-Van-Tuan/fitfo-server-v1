const MessageModel = require('../models/MessageModel');

class MessageController {
    async createMessage(req, res) {
        const { chatId, senderId, title } = req.body;

        const message = new MessageModel({
            chatId,
            senderId,
            title,
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
            const message = await MessageModel.find({ chatId: chatId })
                .sort({ createdAt: -1 }) // Sắp xếp theo thời gian giảm dần (mới nhất lên đầu)
                .limit(100); // Giới hạn số lượng kết quả trả về
            res.status(200).json(message);
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    }

}

module.exports = new MessageController;