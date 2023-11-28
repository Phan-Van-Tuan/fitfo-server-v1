const mongoose = require('mongoose');

const { MONGODB_URI } = process.env

async function connectDB() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('connect DB successfully!!');
        console.log('');
        console.log('------------------------');
    } catch (error) {
        console.log('connect DB failure!!');
        console.log('');
        console.log('------------------------');
    }
}

module.exports = connectDB;

