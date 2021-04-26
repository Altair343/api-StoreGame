import {Router} from 'express';
import * as authCtrl from "../controllers/authController";
import { verifySignup } from "../middlewares";

const router = Router();

/**
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Aquí es donde puedes registrar rutas API para la aplicación. 
| Estas rutas corresponden al regirstro e inicio de sesión de los ususario
|
*/

/**
 * Ruta para registrar a un usuario
 * 
 */
router.post('/signup',[verifySignup.checkDuplicateUsernameOrEmail,verifySignup.checkRolesExisted] ,authCtrl.signup);

/**
 * Ruta para logear al usuario
 * 
 */
router.post('/signin',authCtrl.signin);


export default router;