const Router = require("express").Router();
const User = require("../models/User");
const verify = require("../verifyToken");
const multer = require("multer");

const profilePicStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./profilePics");
    },
    filename: function (req, file, cb) {
        let ext = file.mimetype.split("/")[1];
        cb(null, req.header("userID") + "_" + Date.now() + "." + ext);
    },
});

const groupPicStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./groupPics");
    },
    filename: function (req, file, cb) {
        let ext = file.mimetype.split("/")[1];
        cb(null, req.header("userID") + "_" + Date.now() + "." + ext);
    },
});

const fileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
        // upload only png and jpg format
        return cb(new Error("Please upload a Image"));
    }
    cb(undefined, true);
};

const profilePicUpload = multer({
    storage: profilePicStorage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5000000, // 1000000 Bytes = 1 MB
    },
});

const groupPicUpload = multer({
    storage: groupPicStorage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 10000000, // 1000000 Bytes = 1 MB
    },
});

Router.post(
    "/uploadProfilePic",
    verify,
    profilePicUpload.single("profilePic"),
    async (req, res) => {
        console.log(req.file);
        console.log(req.user);
        try {
            const user = await User.updateOne(
                {
                    _id: req.user._id,
                },
                {
                    $set: { profilePicURL: req.file.path },
                }
            );
            res.status(200).json(user);
        } catch (error) {
            res.status(400).json(error);
        }
    }
);

Router.post(
    "/uploadGroupPic",
    verify,
    groupPicUpload.single("groupPic"),
    async (req, res) => {
        console.log(req.file);
        console.log(req.user);
        try {
            const user = await User.updateOne(
                {
                    _id: req.user._id,
                },
                {
                    $set: { groupPicURL: req.file.path },
                }
            );
            res.status(200).json(user);
        } catch (error) {
            res.status(400).json(error);
        }
    }
);

module.exports = Router;
