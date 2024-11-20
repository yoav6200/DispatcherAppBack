import { onloadOperations } from '../app';
import { Request, Response } from 'express';
import { onLoad } from '../services/news.service';
import {
  INVALID_OPERATION,
  SUCCESSFULL_REMOVE,
  UNKNOWN_ERROR,
} from '../constants/strings';
import { NewsHandler } from '../handlers/news.handlers';

export const newsController = {
  async getNews(req: Request, res: Response) {
    NewsHandler.getAllNews(req, res).then((news) => {
      res.json(news);
    });
  },

  async getNewsById(req: Request, res: Response) {
    NewsHandler.getNewsById(req, res).then((news) => {
      res.json(news);
    });
  },

  async createNews(req: Request, res: Response) {
    NewsHandler.createNews(req, res).then((news) => {
      res.json(news);
    });
  },

  async updateNews(req: Request, res: Response) {
    const news = await NewsHandler.updateNewsById(req, res).then((news) => {
      res.json(news);
    });
  },
  async updateNewsPartial(req: Request, res: Response) {
    const news = await NewsHandler.updateNewsPartial(req, res).then((news) => {
      res.json(news);
    });
  },

  async deleteNewsById(req: Request, res: Response) {
    const news = await NewsHandler.deleteNewsById(req, res).then((news) => {
      res.json(news);
    });
  },
};
