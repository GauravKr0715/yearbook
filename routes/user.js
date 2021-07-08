const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const verify = require("../verifyToken");
const { loginValidation, registerValidation } = require("../validation");
const Router = express.Router();

Router.get("/", (req, res) => {
    res.send(`We are at \"${req.originalUrl}\"`);
});

Router.post("/verifyToken", async (req, res) => {
    const token = req.header("Authorization");
    if (!token)
        return res.status(401).json({
            msg: "Token Unavailable",
        });

    const finalToken = token.split(" ")[1];

    try {
        const verified = jwt.verify(finalToken, process.env.JWT_SECRET);
        console.log(verified);
        const user = await User.findOne({ _id: verified._id });
        if (user) {
            return res.status(200).json(user);
        } else {
            return res.status(400).json({
                msg: "User not found",
            });
        }
    } catch (err) {
        return res.status(403).json({ message: err });
    }
});

//Login to already existing account
Router.post("/login", async (req, res) => {
    // const { error } = loginValidation(req.body);
    // if (error)
    //     return res.status(400).json({ message: error.details[0].message });
    console.log(req.body);
    const user = await User.findOne({ email: req.body.email });
    if (!user)
        return res.status(401).json({ message: "Email doesn't exist.." });

    const passCheck = await bcrypt.compare(req.body.password, user.password);
    if (!passCheck)
        return res.status(401).json({ message: "Password is Invalid" });

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.header("auth-token", token)
        .status(200)
        .json({ message: "Login Successful!!", token: token });
});

Router.post("/register", async (req, res) => {
    const { error } = registerValidation(req.body);
    if (error)
        return res.status(406).json({ message: error.details[0].message });

    const sameEmail = await User.findOne({ email: req.body.email });
    if (sameEmail)
        return res.status(400).json({
            message: "Email already exists...",
        });

    const salt = await bcrypt.genSalt(15);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        profilePicURL: "uploads/defaultImage.jpeg",
        groupPicURL: "uploads/defaultGroupImage.png",
        quote: "Some Quote",
    });

    try {
        const registeredUser = await user.save();
        res.json(registeredUser);
    } catch (error) {
        res.json({
            message: error.message,
        });
    }
});

Router.get("/search", async (req, res) => {
    // res.json(req.query);
    if (Object.keys(req.query).length === 0) {
        res.status(400).json({
            msg: "Query cannot be empty",
        });
    }

    try {
        const users = await User.find(
            {
                username: { $regex: `(?i)^${req.query.name}+.*$` },
            },
            "username"
        );
        res.status(200).json(users);
    } catch (err) {
        res.status(400).json(err);
    }
});

Router.post("/saveQuote", verify, async (req, res) => {
    // console.log(req.body);
    try {
        const updatedUser = await User.updateOne(
            { _id: req.user._id },
            {
                $set: {
                    quote: req.body.quote,
                },
            }
        );
        return res.status(200).json({
            msg: "User quote updated successfully",
        });
    } catch (err) {
        return res.status(400).json(err);
    }
});

module.exports = Router;
