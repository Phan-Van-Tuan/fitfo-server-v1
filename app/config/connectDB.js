const mongoose = require('mongoose');

async function connectDB(uri) {
    try {
        await mongoose.connect(uri);
        console.log('connect successfully!!');
        console.log('');
        console.log('------------------------');
    } catch (error) {
        console.log('connect failure!!');
        console.log('');
        console.log('------------------------');
    }
}

module.exports = connectDB

