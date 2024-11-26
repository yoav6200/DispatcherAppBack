import axios from 'axios';

import { collections } from '../services/database.service';
import {
  API_URL,
  FAILED_DELETE_MANY,
  FAILED_INSERT,
  FAILED_UPDATE_MANY,
  NOTHING_HAPPENED,
} from '../constants/strings';
import News from '../models/news.models';
import { onloadOperations } from '../app';
import dotenv from 'dotenv';
dotenv.config();

const apikey = process.env.APP_API_KEY;

export const fetchNewsArticles = async (apiUrl: string): Promise<News[]> => {
  const response = await axios.get(apiUrl);

  if (response.status !== 200) {
    throw new Error(`API error: ${response.status}`);
  }

  const data = response.data;
  return data.articles.map((article: any) => {
    return new News(
      article.title,
      article.description,
      article.url,
      article.urlToImage,
      article.publishedAt,
      article.author,
      article.content
    );
  });
};

export const insertNewsArticles = async (newsArticles: News[]) => {
  const result = await collections.news_articles?.insertMany(newsArticles);

  if (result) {
    console.log(`Inserted ${result.insertedCount} news articles into MongoDB`);
  } else {
    throw new Error(FAILED_INSERT);
  }
};

export const updateNewsArticles = async (newsArticles: News[]) => {
  const result = await collections.news_articles?.updateMany(
    {},
    { $set: { articles: newsArticles } }
  );

  if (result) {
    console.log(`Updated ${result.modifiedCount} news articles into MongoDB`);
  } else {
    throw new Error(FAILED_UPDATE_MANY);
  }
};

export const deleteNewsArticles = async () => {
  const result = await collections.news_articles?.deleteMany({});

  if (result) {
    console.log(`Deleted ${result.deletedCount} news articles from MongoDB`);
  } else {
    throw new Error(FAILED_DELETE_MANY);
  }
};

export const onLoad = async (operation: onloadOperations): Promise<void> => {
  try {
    const apiUrl = `${API_URL}${apikey}`;
    const newsArticles = await fetchNewsArticles(apiUrl);

    switch (operation) {
      case onloadOperations.Create:
        await insertNewsArticles(newsArticles);
        break;
      case onloadOperations.Update:
        await updateNewsArticles(newsArticles);
        break;
      case onloadOperations.Delete:
        await deleteNewsArticles();
        break;
      case onloadOperations.None:
        console.log(NOTHING_HAPPENED);
        break;
    }
  } catch (error: any) {
    console.error(error.message);
  }
};
