const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');

app.use(express.json());

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});