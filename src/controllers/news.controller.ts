import { onloadOperations } from '../app';
import { Request, Response } from 'express';
import { onLoad } from '../services/news.service';
import {
  INVALID_OPERATION,
  SUCCESSFULL_REMOVE,
  UNKNOWN_ERROR,
} from '../constants/strings';
import {
  getAllNews,
  getNewsById,
  createNews,
  updateNewsById,
  updateNewsPartial,
  deleteNewsById,
} from '../handlers/news.handlers';

export const newsController = {
  async getNews(req: Request, res: Response) {
    getAllNews(req, res).then((news) => {});
  },

  async getNewsById(req: Request, res: Response) {
    getNewsById(req, res).then((news) => {});
  },

  async createNews(req: Request, res: Response) {
    createNews(req, res).then((news) => {});
  },

  async updateNews(req: Request, res: Response) {
    const news = await updateNewsById(req, res).then((news) => {});
  },
  async updateNewsPartial(req: Request, res: Response) {
    const news = await updateNewsPartial(req, res).then((news) => {});
  },

  async deleteNewsById(req: Request, res: Response) {
    const news = await deleteNewsById(req, res).then((news) => {});
  },
};
