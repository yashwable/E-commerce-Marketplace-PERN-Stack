const db = require('../models');
const User = db.user;

exports.listOfSellers = async (req, res) => {
    try {
        User.findAll({
            where: {
                typeOfUser: "seller"
            }
        }).then((seller) => {
            res.status(200).send({
                success: true,
                message: "List of sellers",
                data: seller
            })
        }).catch((err) => {
            res.status(400).send({ error: err });
        });
    } catch (error) {
        console.log("error in buyer.controller.js :: listOfSeller() =>", error);
        res.status(500).send({ success: false, message: error.message || "something went wrong" });
    }
};