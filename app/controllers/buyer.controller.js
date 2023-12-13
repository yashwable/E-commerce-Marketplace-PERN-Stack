const db = require('../models');
const User = db.user;
const Catalog = db.catalog;
const Order = db.order;
const Product = db.product;

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

exports.createOrder = async (req, res) => {
    try {
        const userId = req.userId;
        const { products } = req.body;
        const sellerId = req.params.seller_id;

        Order.create({
            buyerId: userId,
            sellerId: sellerId
        }).then(async (order) => {

            order.setUser(userId).then((result) => {
                console.log("result", result);
            }).catch((err) => {
                return res.status(400).send({ message: "unable to set user", error: err });
            });

            for (const prod in products) {
                const product = await Product.findOne({
                    where: {
                        name: products[prod]
                    }
                })

                if (!product) {
                    return res.status(404).send({ success: false, message: `Product ${prod} not found.` });
                }

                product.setOrders(order.id).then((result) => {
                    console.log("result", result);
                }).catch((err) => {
                    return res.status(400).send({ message: "product is not set", error: err });
                });
            }

            return res.status(200).send({
                success: true,
                message: "Order created successfully",
                data: order
            });
        }).catch((err) => {
            return res.status(400).send({ error: err });
        });
    } catch (error) {
        console.log("error in buyer.controller.js :: createOrder() =>", error);
        res.status(500).send({ success: false, message: error.message || "something went wrong" });
    }
};
