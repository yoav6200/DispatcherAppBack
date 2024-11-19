import express, { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { collections } from '../services/database.service';
import News from '../models/news.models';

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
      res
        .status(404)
        .send(`Unable to find matching document with id: ${req.params.id}`);
    }
  } catch (err: any) {
    res
      .status(404)
      .send(`Unable to find matching document with id: ${req.params.id}`);
  }
});

newsRouter.post('/', async (req: Request, res: Response) => {
  try {
    const newNews = req.body as News;
    const result = await collections.news_articles?.insertOne(newNews);

    result
      ? res
          .status(201)
          .send(
            `Successfully created a new news article with id ${result.insertedId}`
          )
      : res.status(500).send('Failed to create a new news article.');
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
      ? res.status(200).send(`Successfully updated news article with id ${id}`)
      : res.status(304).send(`News article with id: ${id} not updated`);
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
      res.status(202).send(`Successfully removed news article with id ${id}`);
    } else if (!result) {
      res.status(400).send(`Failed to remove news article with id ${id}`);
    } else if (!result.deletedCount) {
      res.status(404).send(`News article with id ${id} does not exist`);
    }
  } catch (err: any) {
    console.error(err.message);
    res.status(400).send(err.message);
  }
});
