const express = require("express");
const Router = express.Router();
const verify = require("../verifyToken");
const User = require("../models/User");
const Message = require("../models/Message");

Router.post("/newMessage", verify, async (req, res) => {
    console.log(req.body);
    try {
        const newMessage = {
            createdAt: Date(),
            toUsername: req.body.to,
            messageBody: req.body.msg,
        };

        // const user = await User.findOne({ _id: req.user._id });
        const user = await User.findOneAndUpdate(
            { _id: req.user._id },
            {
                $push: { messages: newMessage },
            }
        );
        const newMsg = new Message({
            ...newMessage,
            fromUsername: user.username,
        });
        const savedMessage = await newMsg.save();

        // user.messages.push(newMessage);
        // const savedUser = await user.save();
        res.status(200).json({ user, savedMessage });
    } catch (err) {
        res.status(400).json(err);
    }
});

Router.get("/myMessages", verify, async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user._id });
        const messages = await Message.find({ toUsername: user.username });
        return res.status(200).json(messages);
    } catch (err) {
        res.status(400).json(err);
    }
});

Router.get("/mySentMessages", verify, async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user._id });
        const messages = await Message.find({ fromUsername: user.username });
        return res.status(200).json(messages);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = Router;
