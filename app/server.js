/* Phần khai báo */
const express = require('express');
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
var server = createServer(app);

var io = require("socket.io")(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    }
});

connectDB();

// middleware
app.use(express.json());
app.use(cors());
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
