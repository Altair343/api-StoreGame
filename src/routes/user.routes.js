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

router.post('/verifyToken', [authJwt.verifyToken, authJwt.isRole] , (req, res) => {
    return res.status(200).json({
        code: "token/verify",
        response: true,
        message: "token valid",
        data: {
            role: req.roleUser
        }
    });
});

export default router;