const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');

app.use(express.json());

const db = require('./app/models');

db.sequelize.sync({ alter: true }).then(() => {
    console.log('Drop and Resync Db');
});

product = db.product;

app.get('/', (req, res) => {
    res.send('welcome to the home route');
});

require('./app/routes/Auth.routes')(app);
require('./app/routes/buyer.routes')(app);
require('./app/routes/seller.routes')(app);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

function initial() {
    db.product.create({
        name: "Apple",
        price: 100,
    });

    db.product.create({
        name: "Banana",
        price: 50,
    });

    db.product.create({
        name: "Orange",
        price: 80,
    });

    db.product.create({
        name: "Kiwi",
        price: 120,
    });
};

// initial();