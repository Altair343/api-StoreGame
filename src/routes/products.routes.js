import { Router } from 'express';
const router = Router();

import * as productsCtrl from "../controllers/productsController";
import { authJwt } from "../middlewares";

router.get('/', productsCtrl.indexProduct);

router.post('/', [authJwt.verifyToken, authJwt.isAdmin], productsCtrl.storeProduct);

router.get('/:productId', productsCtrl.showProduct);

router.put('/:productId', [authJwt.verifyToken, authJwt.isAdmin], productsCtrl.updateProduct);

router.delete('/:productId', [authJwt.verifyToken, authJwt.isAdmin], productsCtrl.destroyProduct);

export default router;