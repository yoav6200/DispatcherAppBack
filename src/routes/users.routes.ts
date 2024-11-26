import express from 'express';
import { usersController } from '../controllers/users.controller';

export const usersRouter = express.Router();

usersRouter.use(express.json());
usersRouter.get('/', usersController.getUsers);
usersRouter.get('/:id', usersController.getUserById);
usersRouter.post('/', usersController.createUser);
usersRouter.put('/:id', usersController.updateUser);
usersRouter.patch('/:id', usersController.updateUserPartial);
usersRouter.delete('/:id', usersController.deleteUser);
