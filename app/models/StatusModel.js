const mongoose = require('mongoose');

const statusSchema = new mongoose.Schema(

);

const StatusModel = mongoose.model("Status", statusSchema);
module.exports = StatusModel;