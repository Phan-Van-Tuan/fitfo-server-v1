// Import necessary modules and libraries
const express = require('express');
const { createServer } = require('node:http');
const { Server } = require('socket.io');
const { join } = require('node:path');
const cors = require('cors');

// Load environment variables from a .env file
require('dotenv').config();
// Import database connection function
const { connect } = require('./config/database');
// Import routes module
// const router = require('./routes');

// Get ... from environment variables
const PORT = process.env.PORT || 3200;
const MONGODB_URI = process.env.MONGODB_URI;
const SECRET_KEY = process.env.SECRET_KEY;

// Create an instance of the Express application
const app = express();
// Create an HTTP server using the Express app
var server = createServer(app);

// Create a Socket.IO instance and configure CORS
var io = require("socket.io")(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    }
});

// Connect to MongoDB using the provided URI
connect(MONGODB_URI);

// Middleware setup
app.use(express.json());  // Parse incoming JSON requests
app.use(cors());  // Enable Cross-Origin Resource Sharing
// app.use('/api', router);  // Define routes under the '/api' endpoint

// Socket.IO event handling for real-time communication
io.on('connection', (socket) => {
    // Handle 'join_room' event - join a specific room
    socket.on('join_room', (data) => {
        socket.join(data);
    });

    // Handle 'send_message' event - broadcast message to a specific room
    socket.on('send_message', (data) => {
        socket.to(data.room).emit("receive_message", data);
    });
});

// Start the server and listen on the specified port
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});