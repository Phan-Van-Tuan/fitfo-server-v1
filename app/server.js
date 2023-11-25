const express = require('express');
const cors = require("cors");
const { createServer } = require('node:http');
const { Server } = require('socket.io');
const { join } = require('node:path');
const { connectDB } = require('./config/database');



require('dotenv').config();

const router = require('./routes');

const PORT = process.env.PORT || 3200;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/chatApp';
const SECRET_KEY = process.env.SECRET_KEY || 'mysecretkey';

const app = express();
connectDB();
const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    }
});

app.use('/api', router);

io.on('connection', (socket) => {
    socket.on('join_room', (data) => {
        socket.join(data);
    });
    socket.on('send_message', (data) => {
        socket.to(data.room).emit("receive_message", data)
    });
});

server.listen(PORT, () => {
    console.log('server running at http://localhost:3200');
});
