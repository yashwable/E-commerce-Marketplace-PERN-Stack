const db = require("../models");
const User = db.user;

checkDuplicateUsername = (req, res, next) => {
    // Username
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(user => {
        if (user) {
            return res.status(400).send({
                message: "Failed! Username is already in use!"
            });
        }
        next();
    });
}

const verifySignUp = {
    checkDuplicateUsername: checkDuplicateUsername
};

module.exports = verifySignUp;