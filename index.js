const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userRoute = require("./routes/user");
const messageRoute = require("./routes/messages");
const uploadsRoute = require("./routes/upload");
const verifyUser = require("./routes/verifyUser");
const cors = require("cors");
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/profilePics", express.static("profilePics"));
app.use("/groupPics", express.static("groupPics"));
app.use(cors());
app.use("/api/user", userRoute);
app.use("/api/messages", messageRoute);
app.use("/api/upload", uploadsRoute);
app.use("/api/verifyUser", verifyUser);

app.get("/", (req, res) => {
    res.send("Hello Nishtha");
});

mongoose.connect(
    process.env.DB_KEY,
    { useUnifiedTopology: true, useNewUrlParser: true },
    () => {
        console.log(mongoose.connection.readyState);
        console.log("Connected to DB");
    }
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server runnning on PORT ${PORT}`);
});
