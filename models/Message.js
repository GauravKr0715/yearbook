const mongoose = require("mongoose");

const msgSchema = new mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    toUsername: {
        type: String,
        required: true,
    },
    messageBody: {
        type: String,
        required: true,
    },
    fromUsername: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("msg", msgSchema);
