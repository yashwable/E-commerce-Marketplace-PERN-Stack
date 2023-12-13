const db = require('../models');
const User = db.user;
const Catalog = db.catalog;

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

exports.getCatalog = async (req, res) => {
    try {
        const sellerId = req.params.seller_id;

        Catalog.findOne({
            where: {
                sellerId: sellerId
            }
        }).then(async (catalog) => {
            if (!catalog) {
                return res.status(404).send({ message: "Catalog Not found." });
            }

            const products = await catalog.getProducts();

            const productNames = products.map((product) => {
                return product.name;
            });

            res.status(200).send({
                success: true,
                message: "Catalog of seller",
                data: productNames
            })
        }).catch((err) => {
            res.status(400).send({ error: err });
        });
    } catch (error) {
        console.log("error in buyer.controller.js :: getCatalog() =>", error);
        res.status(500).send({ success: false, message: error.message || "something went wrong" });
    }
};