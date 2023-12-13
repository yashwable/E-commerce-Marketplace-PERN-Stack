const db = require('../models');
const User = db.user;
const Product = db.product;
const Catalog = db.catalog;
const Order = db.order;

exports.createCatalog = async (req, res) => {
    try {
        const userId = req.userId;
        const { products } = req.body;

        Catalog.create({
            sellerId: userId
        }).then(async (catalog) => {

            catalog.setUser(userId).then((result) => {
                console.log("result", result);
            }).catch((err) => {
                return res.status(400).send({ error: err });
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

                product.setCatalogs(catalog.id).then((result) => {
                    console.log("result", result);
                }).catch((err) => {
                    return res.status(400).send({ error: err });
                });
            }

            return res.status(200).send({
                success: true,
                message: "Catalog created successfully",
                data: catalog
            });
        }).catch((err) => {
            return res.status(400).send({ error: err });
        });

        // console.log("userId", userId);
        // console.log("products", products);

    } catch (error) {
        console.log("error in seller.controller.js :: createCatalog() =>", error);
        res.status(500).send({ success: false, message: error.message || "something went wrong" });
    }
};

exports.getOrders = async (req, res) => {
    try {
        const userId = req.userId;

        const orders = await Order.findAll({
            where: {
                sellerId: userId
            }
        });

        if (!orders) {
            return res.status(404).send({ success: false, message: `No orders found.` });
        }

        // console.log("orders", orders);
        // console.log("typeof order", typeof orders);

        const ordersWithProducts = await Promise.all(orders.map(async (order) => {
            const products = await order.getProducts();
            return { ...order.toJSON(), products };
        }));

        return res.status(200).send({
            success: true,
            message: "Orders fetched successfully",
            data: ordersWithProducts
        });
    } catch (error) {
        console.log("error in buyer.controller.js :: getOrders() =>", error);
        res.status(500).send({ success: false, message: error.message || "something went wrong" });
    }
};