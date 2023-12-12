const API_CONTEXT = process.env.API_CONTEXT || '/api';
const controller = require("../controllers/auth.controller");
const { verifySignUp } = require("../middleware");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post(
        API_CONTEXT + "/auth/register",
        [
            verifySignUp.checkDuplicateUsername,
            // verifySignUp.checkDuplicateEmail,
            // verifySignUp.checkDuplicatePhone
        ],
        controller.signup
    );

    app.post(
        API_CONTEXT + "/auth/login",
        controller.signin
    );
}