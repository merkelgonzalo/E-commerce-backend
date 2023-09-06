import {Router} from 'express';
import { getCartController, getProductsController, registerController, loginController, forgotPasswordController, resetPasswordController, usersAdministrationController } from '../controllers/views.controller.js';
import { autorization } from '../middlewares/autorization.js';
import { addLogger } from '../utils/logger.js';

const router = Router();

router.get('/', getProductsController);

// router.get('/realTimeProducts', async (req, res) => { 
//     const products = await productModel.find().lean();
//     res.render('realTimeProducts', {products: products});
// });

router.get('/carts/:cid', getCartController);

router.get('/register', registerController);

router.get('/login', loginController);

router.get('/forgot-password', forgotPasswordController);

router.get("/reset-password", resetPasswordController);

router.get("/users-administration", usersAdministrationController);

export default router;