const mongoose = require("mongoose");

const userShema = new mongoose.Schema({
    name: {
        type: String, 
        required: true, 
        minlength: 3, 
        maxLength: 30
    },
    phoneNumber: {
        type: Number, 
        required: true,
        length: 10,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 4,
        maxLength: 1024,
    }},
    {
        timestamps: true,
    }
);

const userModel = mongoose.model("User", userShema);
module.exports = userModel;
