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
    avatar: {
        type: String,
        default: "https://firebasestorage.googleapis.com/v0/b/fitfo-storage.appspot.com/o/avatars%2Flogo_default.png?alt=media&token=7d6ef2a3-383d-430d-a94c-89e272ae1dea",
    },

},
    {
        timestamps: true,
    }
);

const UserModel = mongoose.model("User", UserShema);
module.exports = UserModel;
