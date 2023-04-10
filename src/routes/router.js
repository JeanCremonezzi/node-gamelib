import express from 'express';
const router = express.Router();

import { router as gamesModule } from "./games.js";
import { router as userModule  } from "./user.js";

router.use(gamesModule);
router.use(userModule);

export default router;