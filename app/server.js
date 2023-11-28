// Import necessary modules and libraries
const express = require('express');
const { createServer } = require('http');
const { initSocket } = require('./sockets/chatSocket.js'); // Điều chỉnh đường dẫn nếu cần thiết
// const { join } = require('node:path');
const cors = require('cors');

// Load environment variables from a .env file
require('dotenv').config();
// Import database connection function
const connectDB = require('./config/connectDB');
// Import routes module
const router = require('./routes');

// Get ... from environment variables
const PORT = process.env.PORT || 3200;

// Create an instance of the Express application
const app = express();
// Create an HTTP server using the Express app
var server = createServer(app);

initSocket(server);

// Connect to MongoDB
connectDB();

// Middleware setup
app.use(express.json());  // Parse incoming JSON requests
app.use(cors());  // Enable Cross-Origin Resource Sharing
app.use('/api', router);  // Define routes under the '/api' endpoint

// Start the server and listen on the specified port
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});