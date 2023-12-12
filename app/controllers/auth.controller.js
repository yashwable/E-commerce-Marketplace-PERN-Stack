const validator = require('../config/validator')
const db = require('../models');
const User = db.user;
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    try {
        const validationRules = {
            username: 'required|string',
            password: 'required|string|min:6',
            typeOfUser: 'required|string',
        };
        await validator(req.body, validationRules, {}, (error, status) => {
            if (!status) {
                return res.status(412)
                    .send({
                        success: false,
                        message: 'Validation failed',
                        data: error
                    });
            }
            User.create({
                username: req.body.username,
                password: bcrypt.hashSync(req.body.password, 8),
                typeOfUser: req.body.typeOfUser,
            }).then((user) => {
                res.status(200).send({
                    success: true,
                    message: "User is registered successfully !",
                    data: user
                })
            }).catch((err) => {
                res.status(400).send({ error: err });
            });
        });
    } catch (error) {
        console.log("error in auth.controller.js :: signup() =>", error);
        res.status(500).send({ success: false, message: error.message || "something went wrong" });
    }
}

exports.signin = (req, res) => {
    try {
        User.findOne({
            where: {
                username: req.body.username
            }
        })
            .then(async user => {
                if (!user) {
                    return res.status(404).send({ success: false, message: "user Not found." });
                }

                var passwordIsValid = bcrypt.compareSync(
                    req.body.password,
                    user.password
                );

                if (!passwordIsValid) {
                    return res.status(401).send({
                        success: false,
                        message: "Invalid Password!"
                    });
                }


                var token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
                    expiresIn: 86400 // 24 hours
                });

                res.status(200).send({ success: true, message: "Login successfully.!", data: { token: token, user: user } })

            })
            .catch(err => {
                res.status(500).send({ success: false, message: err.message });
            });
    } catch (error) {
        console.log("error in auth.controller.js :: signin() =>", error);
        res.status(500).send({ success: false, message: error.message || "something went wrong" });
    }
}