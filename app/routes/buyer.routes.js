const API_CONTEXT = process.env.API_CONTEXT || '/api';
const controller = require("../controllers/buyer.controller");
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
        API_CONTEXT + "/buyer/create-order/:seller_id",
        [authJWT.verifyToken],
        controller.createOrder
    );

    app.get(
        API_CONTEXT + "/buyer/list-of-sellers",
        controller.listOfSellers
    );

    app.get(
        API_CONTEXT + "/buyer/seller-catalog/:seller_id",
        controller.getCatalog
    );

};