import { Router } from 'express';
import { getProductsController, getProductController, createProductController, updateProductController, deleteProductController } from "../controllers/products.controller.js";
import { autorization } from '../middlewares/autorization.js';
import { addLogger } from '../utils/logger.js';

const router = Router();

router.get('/', getProductsController);

router.get('/:pid', getProductController);

//DESCOMENTAR PARA AUTORIZACION ADMIN

router.post('/', /*autorization,*/ createProductController);

router.put('/:pid', /*autorization,*/ updateProductController);

router.delete('/:pid', /*autorization,*/ deleteProductController);

export default router;