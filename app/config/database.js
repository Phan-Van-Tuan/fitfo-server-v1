const mongoose = require('mongoose');

// class connectDB = () => {
//     mongoose.connect('mongodb+srv://tuan:mE2pMVyrQ59MgMPo@cluster0.jjwbron.mongodb.net/learn_nodejs?retryWrites=true&w=majority')
//       .then(() => {
//         console.log('connect success');
//       })
//       .catch(() => {
//         console.log('connect failled');
//       })
// }

async function connect() {
    try {
        await mongoose.connect('mongodb+srv://tuan:mE2pMVyrQ59MgMPo@cluster0.jjwbron.mongodb.net/learn_nodejs?retryWrites=true&w=majority',{
            useNewUrlParser: true, 
            useUnifiedTopology: true 
        } );
        console.log('connect successfully!!');
        console.log('');
        console.log('------------------------');
    } catch (error) {
        console.log('connect failure!!');
    }
}

module.exports = { connect };

module.exports = new connectDB;
