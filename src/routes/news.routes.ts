import express from 'express';
import { newsController } from '../controllers/news.Controller';

export const newsRouter = express.Router();

newsRouter.use(express.json());

newsRouter.get('/', newsController.getNews);

newsRouter.get('/:id', newsController.getNewsById);

newsRouter.post('/', newsController.createNews);

newsRouter.put('/:id', newsController.updateNews);

newsRouter.patch('/:id', newsController.updateNewsPartial);

newsRouter.delete('/:id', newsController.deleteNewsById);
