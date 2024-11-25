import { Request, Response } from 'express';
import { UsersHandler } from '../handlers/users.handlers';

export const usersController = {
  async getUsers(req: Request, res: Response) {
    UsersHandler.getUsers(req, res);
  },

  async getUserById(req: Request, res: Response) {
    UsersHandler.getUserById(req, res);
  },

  async createUser(req: Request, res: Response) {
    UsersHandler.createUser(req, res);
  },

  async updateUser(req: Request, res: Response) {
    UsersHandler.updateUser(req, res);
  },

  async updateUserPartial(req: Request, res: Response) {
    UsersHandler.updateUserPartial(req, res);
  },

  async deleteUser(req: Request, res: Response) {
    UsersHandler.deleteUser(req, res);
  },
};
