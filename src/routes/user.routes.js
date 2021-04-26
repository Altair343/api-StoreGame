import { Router } from "express";
const router = Router();

import * as usersCtrl from "../controllers/userController";
import { verifySignup, authJwt } from "../middlewares";

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Aquí es donde puedes registrar rutas API para la aplicación.
|
*/

/**
 * Ruta para verificar el token
 * 
 */

router.post('/verifyToken', authJwt.verifyToken , (req, res) => {
    return res.status(200).json({
        code: "token/verify",
        response: true,
        message: "token valid"
    });
});

export default router;