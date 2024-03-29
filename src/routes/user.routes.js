import { Router } from "express";
const router = Router();

import * as usersCtrl from "../controllers/userController";
import { authJwt } from "../middlewares";

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

router.post('/verifyToken', [authJwt.verifyToken, authJwt.isRole], (req, res) => {
    return res.status(200).json({
        code: "token/verify",
        response: true,
        message: "token valid",
        data: {
            role: req.roleUser
        }
    });
});

/**
 * Ruta para realizar un pago
 * 
 */

router.post('/payment', authJwt.verifyToken, usersCtrl.paymentProduct);

/**
 * Ruta para mostrar la biblioteca del usuarios
 * 
 */

 router.post('/library', authJwt.verifyToken, usersCtrl.libraryUser);


export default router;