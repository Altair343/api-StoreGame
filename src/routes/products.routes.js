import { Router } from 'express';
const router = Router();

import * as productsCtrl from "../controllers/productsController";
import { authJwt, uploadImg } from "../middlewares";

/** 
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Aquí es donde puedes registrar rutas API para la aplicación. 
| Estas rutas corresponden a los productos
|
*/

/**
 * Ruta para listar todos los productos
 * 
 */

router.get('/', productsCtrl.indexProduct);

/**
 * Ruta para crear un producto
 * Se requiere un token al igual que un rol de administrador
 * 
 */

router.post('/', [authJwt.verifyToken, authJwt.isAdmin, uploadImg.middleMulter], productsCtrl.storeProduct);

/**
 * Ruta para listar un producto
 * 
 */

router.get('/:productId', productsCtrl.showProduct);

/**
 * Ruta para listar los prductos que pertenescan a una categoria
 * 
 */

 router.get('/category/:categoryName', productsCtrl.showCategory);


/**
 * Ruta para listar una x cantidad de productos mas vendidos
 * 
 */

 router.get('/sales/:shop', productsCtrl.showProductSales);

/**
 * Ruta para actualizar un producto
 * Se requiere un token al igual que un rol de administrador
 * 
 */

router.put('/:productId', [authJwt.verifyToken, authJwt.isAdmin, uploadImg.middleMulter], productsCtrl.updateProduct);

/**
 * Ruta para eliminar un producto
 * Se requiere un token al igual que un rol de administrador
 * 
 */

router.delete('/:productId', [authJwt.verifyToken, authJwt.isAdmin], productsCtrl.destroyProduct);


export default router;