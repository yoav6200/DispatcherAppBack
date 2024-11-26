import { Request, Response } from 'express';
import {
  getUsersbyId,
  getAllUsers,
  createOneUser,
  updateOneUser,
  updateOneUserPartial,
  deleteUserById,
} from '../handlers/users.handlers';

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  getAllUsers(req, res);
};
export const getUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  getUsersbyId(req, res);
};

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  createOneUser(req, res);
};
export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  updateOneUser(req, res);
};
export const updateUserPartial = async (
  req: Request,
  res: Response
): Promise<void> => {
  updateOneUserPartial(req, res);
};
export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  deleteUserById(req, res);
};
