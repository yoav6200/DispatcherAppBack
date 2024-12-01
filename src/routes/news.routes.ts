import express from 'express';
import {
  getNews,
  getNewsById,
  createNews,
  updateNews,
  updateNewsPartial,
  deleteNewsById,
} from '../controllers/news.controller';

export const newsRouter = express.Router();

newsRouter.use(express.json());

newsRouter.get('/', getNews);

newsRouter.get('/:id', getNewsById);

newsRouter.post('/', createNews);

newsRouter.put('/:id', updateNews);

newsRouter.patch('/:id', updateNewsPartial);

newsRouter.delete('/:id', deleteNewsById);
