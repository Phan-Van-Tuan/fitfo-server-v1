let onlineUsers = [];

const MessageModel = require('../models/MessageModel');
const ChatModel = require('../models/ChatModel');

function initSocket(server) {
    // Create a Socket.IO instance and configure CORS
    var io = require("socket.io")(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
        }
    });

    // Socket.IO event handling for real-time communication
    io.on('connection', (socket) => {

        // Listen to a connection
        console.log("new connection ", socket.id);
        socket.on('addNewUser', (userId) => {
            // !onlineUsers.some((user) => user.userId === userId) &&
            onlineUsers.push({
                userId,
                socketId: socket.id,
            });

            console.log('onlineUsers', onlineUsers);
        })

        // Add message
        socket.on('sendMessage', async (messageString) => {
            try {
                // console.log(messageString);
                const message = JSON.parse(messageString);
                if (!message || !message.chatId || !message.senderId || !message.title || !message.type) {
                    // Xử lý lỗi nếu dữ liệu không hợp lệ
                    console.error('Invalid message format');
                    return;
                }
                const chat = await ChatModel.findById(message.chatId);
                // Lấy mảng các người nhận
                const recipientIds = chat.members;
                const users = onlineUsers.filter(user => recipientIds.includes(user.userId));
                // Tiếp tục xử lý và tạo đối tượng newMessage
                const newMessage = new MessageModel({
                    chatId: message.chatId,
                    senderId: message.senderId,
                    title: message.title,
                    type: message.type

                });
                // console.log(newMessage);


                // Lưu tin nhắn vào cơ sở dữ liệu
                newMessage.save()
                    .then(savedMessage => {
                        // Gửi tin nhắn và thông báo đến người nhận
                        users.forEach(user => {
                            // Your logic for each user
                            io.to(user.socketId).emit('receivedMessage', savedMessage);
                            // console.log('3', user.socketId);

                            io.to(user.socketId).emit('getNotification', {
                                latestSenderId: savedMessage.senderId,
                                chatId: savedMessage.chatId,
                                latestMessage: savedMessage.title,
                                latestType: savedMessage.type,
                                isRead: false,
                                latestSend: savedMessage.createdAt,
                            });
                        });
                    })
                    .catch(error => {
                        console.error('Error saving message to database:', error);
                    });
            } catch (error) {
                console.error('Error parsing message JSON:', error);
            }
        });

        // // Sự kiện xảy ra khi người nhận đăng nhập
        // socket.on('userLoggedIn', (userId) => {
        //     // Tìm các tin nhắn chưa gửi đến người nhận
        //     MessageModel.find({ receiverId: userId, sent: false })
        //         .then(messages => {
        //             messages.forEach(message => {
        //                 // Gửi tin nhắn và thông báo đến người nhận
        //                 io.to(message.chatId).emit('receivedMessage', message);

        //                 // Đánh dấu tin nhắn đã được gửi
        //                 message.sent = true;
        //                 message.save();
        //             });
        //         })
        //         .catch(error => {
        //             console.error('Error fetching unsent messages:', error);
        //         });
        // });

        // Xử lý sự kiện khi người dùng ngắt kết nối
        socket.on('disconnect', () => {
            onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
            console.log('new', onlineUsers);
        });
    });

}

module.exports = { initSocket };

