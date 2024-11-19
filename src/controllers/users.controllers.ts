import { Request, Response } from 'express';
import {
  User,
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from '../models/users.models';
import {
  USER_CREATED,
  USER_DELETED,
  USER_NOT_FOUND,
  USER_UPDATED,
} from '../constants/strings';

export const getUsersController = (req: Request, res: Response): void => {
  const users: User[] = getUsers();
  res.status(200).json({ users });
};

export const getUserByIdController = (req: Request, res: Response): void => {
  const id: number = parseInt(req.params.id, 10);
  const user: User | undefined = getUserById(id);
  if (user) {
    res.status(200).json({ user });
  } else {
    res.status(404).json({ message: USER_NOT_FOUND });
  }
};

export const createUserController = (req: Request, res: Response): void => {
  const user: User = req.body;
  createUser(user);
  res.status(201).json({
    message: USER_CREATED,
    user,
  });
};

export const updateUserController = (req: Request, res: Response): void => {
  const id: number = parseInt(req.params.id, 10);
  const userUpdate: User = req.body;
  userUpdate.id = id;
  updateUser(userUpdate);
  res.status(200).json({
    message: USER_UPDATED,
    user: userUpdate,
  });
};

export const deleteUserController = (req: Request, res: Response): void => {
  const id: number = parseInt(req.params.id, 10);
  deleteUser(id);
  res.status(200).json({
    message: `${USER_DELETED} ${id} `,
  });
};
