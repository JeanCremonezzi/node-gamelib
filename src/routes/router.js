import express, {request, response} from 'express';
const router = express.Router();

import { router as gameRoutes } from "./games.js";

router.use(gameRoutes);

export default router;