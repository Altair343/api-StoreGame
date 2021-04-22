import { Router } from "express";
const router = Router();

import * as usersCtrl from "../controllers/userController";
import { verifySignup } from "../middlewares";

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Aquí es donde puedes registrar rutas API para la aplicación. 
| 
|
*/

export default router;