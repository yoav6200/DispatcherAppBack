import express, { Request, Response } from 'express';

import {
  validateUser,
  validateUserPartial,
} from '../utils/validations/users.validations';
import {
  getUsers,
  createUser,
  updateUser,
  updateUserPartial,
  deleteUser,
  getUserById,
  addFavoriteItem,
  removeFavoriteItem,
  getAllUserFavorites,
} from '../controllers/users.controller';

export const usersRouter = express.Router();

usersRouter.use(express.json());
usersRouter.use((req: Request, res: Response, next) => {
  console.log('At Middleware', req.body);
  next();
});

usersRouter.get('/', getUsers);

usersRouter.get('/:id', getUserById);

usersRouter.get('/:userId/favorite', getAllUserFavorites);

usersRouter.post('/', validateUser, createUser);

usersRouter.put('/:id', validateUserPartial, updateUser);

usersRouter.patch('/:id', validateUserPartial, updateUserPartial);

usersRouter.delete('/:id', deleteUser);

usersRouter.post('/:userId/favorite', addFavoriteItem);

usersRouter.delete('/:userId/favorite', removeFavoriteItem);
