import { Router } from 'express';
import {
  getUsersHandler,
  getUserByIdHandler,
  createUserHandler,
  updateUserHandler,
  deleteUserHandler,
} from '../handlers/users.handlers';
import { validateUser } from '../utils/validations/users.validations';

const router = Router();

router.get('/', getUsersHandler);
router.get('/:id', getUserByIdHandler);
router.post('/', validateUser, createUserHandler);
router.put('/:id', validateUser, updateUserHandler);
router.delete('/:id', deleteUserHandler);

export default router;
