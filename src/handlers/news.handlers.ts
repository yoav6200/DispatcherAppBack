import { Request, Response } from 'express';
import { News } from '../models/news.models';
import {
  SUCCESSFULL_CREATE,
  UNABLE_FIND,
  SUCCESSFULL_UPDATE,
  FAILED_REMOVE,
  SUCCESSFULL_REMOVE,
} from '../constants/strings';

// Get all news
export const getAllNews = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const news = await News.find();
    res.status(200).json(news);
  } catch (error: any) {
    res
      .status(500)
      .send({ message: error.message || 'An unknown error occurred' });
  }
};

// Get news by ID
export const getOneNewsById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = req.params.id;

  try {
    const news = await News.findById(id);
    if (news) {
      res.status(200).json(news);
    } else {
      res.status(404).send({ message: `${UNABLE_FIND} ${id}` });
    }
  } catch (error) {
    res.status(500).send({ message: `${UNABLE_FIND} ${id}` });
  }
};
export const updateNewsArticlePartial = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = req.params.id;
  const updates = req.body;

  try {
    const updatedNews = await News.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true }
    );

    if (updatedNews) {
      res.status(200).send({
        message: `${SUCCESSFULL_UPDATE}`,
        updatedNews,
      });
    } else {
      res.status(404).send({
        message: `${UNABLE_FIND} ${id}`,
      });
    }
  } catch (error: any) {
    res.status(400).send({
      message:
        error.message ||
        'An unknown error occurred while updating news article.',
    });
  }
};

// Create news
export const createNewsArticle = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const newNews = new News(req.body);
    const savedNews = await newNews.save();
    res
      .status(201)
      .send({ message: `${SUCCESSFULL_CREATE}`, newsId: savedNews._id });
  } catch (error: any) {
    res.status(400).send({ message: error.message });
  }
};

// Update news by ID
export const updateNewsById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = req.params.id;

  try {
    const updatedNews = await News.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (updatedNews) {
      res.status(200).send({ message: `${SUCCESSFULL_UPDATE}`, updatedNews });
    } else {
      res.status(404).send({ message: `${UNABLE_FIND} ${id}` });
    }
  } catch (error: any) {
    res.status(400).send({ message: error.message });
  }
};

// Delete news by ID
export const deleteNewsArticleById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = req.params.id;

  try {
    const deletedNews = await News.findByIdAndDelete(id);
    if (deletedNews) {
      res.status(202).send({ message: `${SUCCESSFULL_REMOVE}` });
    } else {
      res.status(404).send({ message: `${FAILED_REMOVE} ${id}` });
    }
  } catch (error: any) {
    res.status(400).send({ message: error.message });
  }
};
