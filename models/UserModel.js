const mongoose = require("mongoose");

const UserShema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxLength: 30
    },
    phoneNumber: {
        type: String,
        required: true,
        minlength: 10,
        maxLength: 12,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        minlength: 3,
        maxLength: 30,
    },
    password: {
        type: String,
        required: true,
        minlength: 4,
        maxLength: 1024,
    },
    
},
    {
        timestamps: true,
    }
);

const UserModel = mongoose.model("User", UserShema);
module.exports = UserModel;
