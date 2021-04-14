import {Router} from 'express';
import { UserController } from './../controller/UserController';

const router = Router();

//Get users
router.get('/', UserController.getAll);

//Get un usuario
router.get('/:id', UserController.getById);
// Crear Usuario
router.post('/', UserController.newUser);
//Editar Usuario
router.patch('/:id', UserController.editUser);
//
router.delete('/id', UserController.deleteUser);

export default router;




