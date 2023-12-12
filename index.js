const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');

app.use(express.json());

const db = require('./app/models');

db.sequelize.sync({ alter: true }).then(() => {
    console.log('Drop and Resync Db');
});

app.get('/', (req, res) => {
    res.send('welcome to the home route');
});

require('./app/routes/Auth.routes')(app);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});