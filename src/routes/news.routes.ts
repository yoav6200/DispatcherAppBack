import express from 'express';
import {
  fetchAllNews,
  fetchNewsById,
  createNews,
  updateNewsById,
  deleteNewsById,
} from '../handlers/news.handlers';
import { loadNewsData } from '../controllers/controller';

export const newsRouter = express.Router();

newsRouter.use(express.json());

newsRouter.get('/', fetchAllNews);

newsRouter.get('/:id', fetchNewsById);

newsRouter.post('/', createNews);

newsRouter.put('/:id', updateNewsById);

newsRouter.delete('/:id', deleteNewsById);

newsRouter.get('/load', loadNewsData);
