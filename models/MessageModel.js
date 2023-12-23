const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
    {
        chatId: String,
        senderId: String,
        title: String,
    },
    {
        timestamps: true,
    }
);

const MessageModel = mongoose.model("Message", messageSchema);
module.exports = MessageModel;