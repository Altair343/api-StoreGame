import {Router} from 'express';
const router = Router();

import * as productsCtrl from "../controllers/productsController";

router.get('/',productsCtrl.indexProduct);
router.post('/',productsCtrl.storeProduct);
router.get('/:productId',productsCtrl.showProduct);
router.put('/:productId',productsCtrl.updateProduct);
router.delete('/:productId',productsCtrl.destroyProduct);

export default router;