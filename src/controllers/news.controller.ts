import { onloadOperations } from '../app';
import { Request, Response } from 'express';
import { onLoad } from '../services/news.service';

import {
  getAllNews,
  getOneNewsById,
  createNewsArticle,
  updateNewsById,
  updateNewsArticlePartial,
  deleteNewsArticleById,
} from '../handlers/news.handlers';

export const getNews = async (req: Request, res: Response): Promise<void> => {
  getAllNews(req, res).then((news) => {});
};
export const getNewsById = async (
  req: Request,
  res: Response
): Promise<void> => {
  getOneNewsById(req, res).then((news) => {});
};

export const createNews = async (
  req: Request,
  res: Response
): Promise<void> => {
  createNewsArticle(req, res).then((news) => {});
};
export const updateNews = async (
  req: Request,
  res: Response
): Promise<void> => {
  const news = await updateNewsById(req, res).then((news) => {});
};

export const updateNewsPartial = async (
  req: Request,
  res: Response
): Promise<void> => {
  const news = await updateNewsArticlePartial(req, res).then((news) => {});
};
export const deleteNewsById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const news = await deleteNewsArticleById(req, res).then((news) => {});
};
