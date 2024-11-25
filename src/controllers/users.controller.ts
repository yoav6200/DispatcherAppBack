import { Request, Response } from 'express';
import {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
  updateUserPartial,
  getUsersbyId,
} from '../handlers/users.handlers';

export const usersController = {
  async getUsers(req: Request, res: Response) {
    getUsers(req, res);
  },

  async getUserById(req: Request, res: Response) {
    getUsersbyId(req, res);
  },

  async createUser(req: Request, res: Response) {
    createUser(req, res);
  },

  async updateUser(req: Request, res: Response) {
    updateUser(req, res);
  },

  async updateUserPartial(req: Request, res: Response) {
    updateUserPartial(req, res);
  },

  async deleteUser(req: Request, res: Response) {
    deleteUser(req, res);
  },
};
