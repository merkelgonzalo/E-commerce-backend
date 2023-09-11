import { Router } from 'express';
import passport from 'passport';
import { changeRoleController, deleteUsersController, getUsersController, deleteUserController } from '../controllers/users.controller.js';
import { autorization } from '../middlewares/autorization.js';

const router = Router();

router.put('/premium/:uid', autorization, changeRoleController);

router.get('/', /*autorization,*/ getUsersController);

router.delete('/', /*autorization,*/ deleteUsersController);

router.delete('/:uid', /*autorization,*/ deleteUserController);

export default router;