const API_CONTEXT = process.env.API_CONTEXT || '/api';
const controller = require("../controllers/seller.controller");
const authJWT = require("../middleware/authJWT");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post(
        API_CONTEXT + "/seller/create-catalog",
        [authJWT.verifyToken],
        controller.createCatalog
    );
};