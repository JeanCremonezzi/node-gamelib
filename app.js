const express = require('express');
require('dotenv').config();
const router = require('./src/routes/router.js');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
const port = process.env.SERVER_PORT;

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin : "http://localhost:5173",
    credentials: true,
}))

app.use(router);

app.listen(port, () => {
    console.log(`\nApp running on port ${port}\n`)
})