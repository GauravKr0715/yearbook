const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    const token = req.header("Authorization");
    // console.log(token);
    if (!token) return res.status(401).send("Access Denied");

    try {
        const verified = jwt.verify(token, "somesupersecretkey");
        req.user = verified;
        next();
    } catch (err) {
        res.status(403).send("Invalid Token");
    }
};
