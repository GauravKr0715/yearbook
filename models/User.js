const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePicURL: {
        type: String,
    },
    groupPicURL: {
        type: String,
    },
    quote: String,
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    messages: [
        {
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
        },
    ],
});

module.exports = mongoose.model("user", userSchema);
