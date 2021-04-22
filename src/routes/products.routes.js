import { Router } from 'express';
const router = Router();

import * as productsCtrl from "../controllers/productsController";
import { authJwt } from "../middlewares";

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Aquí es donde puedes registrar rutas API para la aplicación. 
| Estas rutas corresponden a los productos
|
*/

/*
 *  Ruta para listar todos los productos
 */

router.get('/', productsCtrl.indexProduct);

/*
 * Ruta para crear un producto
 * Se requiere un token al igual que un rol de administrador
 */

router.post('/', [authJwt.verifyToken, authJwt.isAdmin], productsCtrl.storeProduct);

/*
 *  Ruta para listar un producto
 */

router.get('/:productId', productsCtrl.showProduct);

/*
 * Ruta para actualizar un producto
 * Se requiere un token al igual que un rol de administrador
 */

router.put('/:productId', [authJwt.verifyToken, authJwt.isAdmin], productsCtrl.updateProduct);

/*
 * Ruta para eliminar un producto
 * Se requiere un token al igual que un rol de administrador
 */

router.delete('/:productId', [authJwt.verifyToken, authJwt.isAdmin], productsCtrl.destroyProduct);


export default router;