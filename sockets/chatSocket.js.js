// let onlineUsers = [];

// function initSocket(server) {
//     // Create a Socket.IO instance and configure CORS
//     var io = require("socket.io")(server, {
//         cors: {
//             origin: "*",
//             methods: ["GET", "POST"],
//         }
//     });

//     // Socket.IO event handling for real-time communication
//     io.on('connection', (socket) => {

//         // Listen to a connection
//         console.log("new connection ", socket.id);
//         socket.on('addNewUser', (userId) => {
//             !onlineUsers.some((user) => user.userId === userId) &&
//                 onlineUsers.push({
//                     userId,
//                     socketId: socket.id,
//                 });

//             console.log('onlineUsers', onlineUsers);

//             io.emit('getOnlineUsers', onlineUsers);
//         })

//         // Add message
//         socket.on('sendMessage', (message) => {
//             const user = onlineUsers.find(
//                 (user) => user.userId === message.recipientId
//             );

//             if (user) {
//                 io.to(user.socketId).emit('getMessage', message);
//                 io.to(user.socketId).emit('getNotification', {
//                     senderId: message.senderId,
//                     isRead: false,
//                     date: new Date(),
//                 });
//             }

//         });

//         // Xử lý sự kiện khi người dùng ngắt kết nối
//         socket.on('disconnect', () => {
//             onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);

//             io.emit('getOnlineUsers', onlineUsers);
//         });
//     });

// }

// module.exports = { initSocket };

let onlineUsers = [];
let io; // Declare io outside the function scope

function initSocket(server) {
    // Create a Socket.IO instance and configure CORS
    io = require("socket.io")(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
        },
    });
}

// Export the handler function for Vercel
module.exports = async (req, res) => {
    if (!io) {
        initSocket(req.server); // Initialize Socket.IO only once
    }

    if (req.method === "POST") {
        // Handle Socket.IO connection
        io.on('connection', (socket) => {
            console.log("new connection ", socket.id);

            socket.on('addNewUser', (userId) => {
                !onlineUsers.some((user) => user.userId === userId) &&
                    onlineUsers.push({
                        userId,
                        socketId: socket.id,
                    });

                console.log('onlineUsers', onlineUsers);

                io.emit('getOnlineUsers', onlineUsers);
            });

            socket.on('sendMessage', (message) => {
                const user = onlineUsers.find(
                    (user) => user.userId === message.recipientId
                );

                if (user) {
                    io.to(user.socketId).emit('getMessage', message);
                    io.to(user.socketId).emit('getNotification', {
                        senderId: message.senderId,
                        isRead: false,
                        date: new Date(),
                    });
                }
            });

            socket.on('disconnect', () => {
                onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
                io.emit('getOnlineUsers', onlineUsers);
            });
        });

        res.status(200).end();
    } else {
        res.status(404).end();
    }
};
