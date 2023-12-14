// // Import necessary modules and libraries
// const express = require('express');
// const { createServer } = require('http');
// const { initSocket } = require('./sockets/chatSocket.js'); // Điều chỉnh đường dẫn nếu cần thiết
// // const { join } = require('node:path');
// const cors = require('cors');

// // Load environment variables from a .env file
// require('dotenv').config();
// // Import database connection function
// const connectDB = require('./config/connectDB');
// // Import routes module
// const router = require('./routes');

// // Get ... from environment variables
// const PORT = process.env.PORT || 3200;

// // Create an instance of the Express application
// const app = express();
// // Create an HTTP server using the Express app
// var server = createServer(app);

// initSocket(server);

// // Connect to MongoDB
// connectDB();

// // Middleware setup
// app.use(express.json());  // Parse incoming JSON requests
// app.use(cors());  // Enable Cross-Origin Resource Sharing
// app.use('/api', router);  // Define routes under the '/api' endpoint

// // Start the server and listen on the specified port
// server.listen(PORT, () => {
//     console.log(`Server running at http://localhost:${PORT}`);
// });

// Import các module và thư viện cần thiết
const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const connectDB = require('./config/connectDB');
const router = require('./routes');

// Lấy PORT từ biến môi trường hoặc sử dụng mặc định là 3200
const PORT = process.env.PORT || 3200;

// Tạo một instance của ứng dụng Express
const app = express();
// Tạo một HTTP server bằng cách sử dụng ứng dụng Express
const server = createServer(app);
// Kết nối đến MongoDB
connectDB();

// Middleware setup
app.use(express.json());  // Parse các yêu cầu JSON đến
app.use(cors());  // Bật Cross-Origin Resource Sharing
app.use('/api', router);  // Định nghĩa các routes dưới endpoint '/api'

// Kích hoạt Socket.IO
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// Xử lý sự kiện khi có kết nối mới
io.on('connection', (socket) => {
    console.log("Kết nối mới ", socket.id);

    // Xử lý sự kiện khi người dùng thêm mới
    socket.on('addNewUser', (userId) => {
        if (!onlineUsers.some((user) => user.userId === userId)) {
            onlineUsers.push({
                userId,
                socketId: socket.id,
            });
        }

        console.log('Danh sách người dùng trực tuyến', onlineUsers);

        io.emit('getOnlineUsers', onlineUsers);
    });

    // Xử lý sự kiện khi người dùng gửi tin nhắn
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

    // Xử lý sự kiện khi người dùng ngắt kết nối
    socket.on('disconnect', () => {
        onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
        io.emit('getOnlineUsers', onlineUsers);
    });
});

// Bắt đầu server và lắng nghe trên cổng được chỉ định
server.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});

