import express from 'express';
import * as dotenv from 'dotenv';
import router from './src/routes/router.js';

dotenv.config();
const app = express();
const port = process.env.SERVER_PORT;

app.use(router);

app.listen(port, () => {
    console.log(`\nApp running on port ${port}\n`)
})