import { Router } from "express";
const router = Router();

import * as usersCtrl from "../controllers/userController";
import { verifySignup } from "../middlewares";



export default router;