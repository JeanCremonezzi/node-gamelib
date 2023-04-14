const express = require('express');
require('dotenv').config();
const router = require('./src/routes/router.js');

const app = express();
const port = process.env.SERVER_PORT;

app.use(router);

app.listen(port, () => {
    console.log(`\nApp running on port ${port}\n`)
})