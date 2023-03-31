import express from 'express';
import * as dotenv from 'dotenv';
import router from './src/routes.js';

dotenv.config();
const app = express();
const port = process.env.SERVER_PORT;

app.use(router);

app.listen(port, () => {
    console.log(`App running on port ${port}`)
})