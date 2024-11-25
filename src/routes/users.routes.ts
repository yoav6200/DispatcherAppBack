import express, { Request, Response } from 'express';
import { usersController } from '../controllers/users.controller';
import {
  validateUser,
  validateUserPartial,
} from '../utils/validations/users.validations';

export const usersRouter = express.Router();

usersRouter.use(express.json());
usersRouter.use((req: Request, res: Response, next) => {
  console.log('At Middleware', req.body);
  next();
});
usersRouter.get('/', usersController.getUsers);
usersRouter.get('/:id', usersController.getUserById);
usersRouter.post('/', validateUser, usersController.createUser);
usersRouter.put('/:id', validateUserPartial, usersController.updateUser);
usersRouter.patch(
  '/:id',
  validateUserPartial,
  usersController.updateUserPartial
);
usersRouter.delete('/:id', usersController.deleteUser);
