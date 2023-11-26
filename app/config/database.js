const mongoose = require('mongoose');

async function connect(uri) {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('connect successfully!!');
        console.log('');
        console.log('------------------------');
    } catch (error) {
        console.log('connect failure!!');
        console.log('');
        console.log('------------------------');
    }
}

module.exports = { connect };

