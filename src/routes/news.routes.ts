import express, { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { collections } from '../services/database.service';
import News from '../models/news.models';
import {
  SUCCESSFULL_CREATE,
  UNABLE_FIND,
  FAILED_CREATE,
  SUCCESSFULL_UPDATE,
  FAILED_UPDATE,
  SUCCESSFULL_REMOVE,
  FAILED_REMOVE,
  NOT_EXIST_REMOVE,
} from '../constants/strings';

export const newsRouter = express.Router();

newsRouter.use(express.json());

newsRouter.get('/', async (_req: Request, res: Response) => {
  try {
    const news = (await collections.news_articles
      ?.find({})
      .toArray()) as unknown as News[];

    res.status(200).send(news);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

newsRouter.get('/:id', async (req: Request, res: Response) => {
  const id = req?.params?.id;

  try {
    const query = { _id: new ObjectId(id) };
    const news = (await collections.news_articles?.findOne(
      query
    )) as unknown as News;

    if (news) {
      res.status(200).send(news);
    } else {
      res.status(404).send(` ${UNABLE_FIND} ${req.params.id}`);
    }
  } catch (err: any) {
    res.status(404).send(`${UNABLE_FIND} ${req.params.id}`);
  }
});

newsRouter.post('/', async (req: Request, res: Response) => {
  try {
    const newNews = req.body as News;
    const result = await collections.news_articles?.insertOne(newNews);

    result
      ? res.status(201).send(`${SUCCESSFULL_CREATE} ${result.insertedId}`)
      : res.status(500).send(`${FAILED_CREATE}`);
  } catch (err: any) {
    console.error(err);
    res.status(400).send(err.message);
  }
});

newsRouter.put('/:id', async (req: Request, res: Response) => {
  const id = req?.params?.id;

  try {
    const updatedNews: News = req.body as News;
    const query = { _id: new ObjectId(id) };

    const result = await collections.news_articles?.updateOne(query, {
      $set: updatedNews,
    });

    result
      ? res.status(200).send(`${SUCCESSFULL_UPDATE} ${id}`)
      : res.status(304).send(`${FAILED_UPDATE} ${id} `);
  } catch (err: any) {
    console.error(err.message);
    res.status(400).send(err.message);
  }
});

newsRouter.delete('/:id', async (req: Request, res: Response) => {
  const id = req?.params?.id;

  try {
    const query = { _id: new ObjectId(id) };
    const result = await collections.news_articles?.deleteOne(query);

    if (result && result.deletedCount) {
      res.status(202).send(`${SUCCESSFULL_REMOVE} ${id}`);
    } else if (!result) {
      res.status(400).send(`${FAILED_REMOVE}${id}`);
    } else if (!result.deletedCount) {
      res.status(404).send(`${NOT_EXIST_REMOVE} ${id}`);
    }
  } catch (err: any) {
    console.error(err.message);
    res.status(400).send(err.message);
  }
});
