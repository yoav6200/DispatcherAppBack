import { Request, Response } from 'express';
import { UsersHandler } from '../handlers/users.handlers';
import { validateUser } from '../utils/validations/users.validations';

export const usersController = {
  async getUsers(req: Request, res: Response) {
    validateUser(req, res, () => {
      UsersHandler.getUsers(req, res);
    });
  },

  async getUserById(req: Request, res: Response) {
    validateUser(req, res, () => {
      UsersHandler.getUserById(req, res);
    });
  },

  async createUser(req: Request, res: Response) {
    validateUser(req, res, () => {
      UsersHandler.createUser(req, res);
    });
  },

  async updateUser(req: Request, res: Response) {
    validateUser(req, res, () => {
      UsersHandler.updateUser(req, res);
    });
  },

  async updateUserPartial(req: Request, res: Response) {
    validateUser(req, res, () => {
      UsersHandler.updateUserPartial(req, res);
    });
  },

  async deleteUser(req: Request, res: Response) {
    validateUser(req, res, () => {
      UsersHandler.deleteUser(req, res);
    });
  },
};
