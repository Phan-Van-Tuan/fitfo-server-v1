const socketIO = require('socket.io');

function initSocket(server) {
    const io = socketIO(server);

    io.on('connection', (socket) => {
        console.log(`A user connected: ${socket.id}`);

        // Xử lý sự kiện khi một tin nhắn được gửi
        socket.on('chatMessage', (data) => {
            console.log(`Received message from ${socket.id}: ${data.message}`);

            // Gửi tin nhắn đến tất cả các kết nối khác
            io.emit('chatMessage', { userId: socket.id, message: data.message });
        });

        // Xử lý sự kiện khi người dùng ngắt kết nối
        socket.on('disconnect', () => {
            console.log(`User disconnected: ${socket.id}`);
        });
    });
}

module.exports = { initSocket };

// // Create a Socket.IO instance and configure CORS
// var io = require("socket.io")(server, {
//     cors: {
//         origin: "*",
//         methods: ["GET", "POST"],
//     }
// });

// // Socket.IO event handling for real-time communication
// io.on('connection', (socket) => {
//     // Handle 'join_room' event - join a specific room
//     socket.on('join_room', (data) => {
//         socket.join(data);
//     });

//     // Handle 'send_message' event - broadcast message to a specific room
//     socket.on('send_message', (data) => {
//         socket.to(data.room).emit("receive_message", data);
//     });
// });