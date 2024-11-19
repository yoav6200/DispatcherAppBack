import axios from 'axios';
import mongoose, { Schema } from 'mongoose';
import {
  API_URL,
  FAILED_DELETE_MANY,
  FAILED_INSERT,
  FAILED_UPDATE_MANY,
  NOTHING_HAPPENED,
} from '../constants/strings';
import 'dotenv/config';
import News from '../models/news.models';
import { collections } from '../services/database.service';
import { onloadOperations } from '../app';

const apikey = process.env.APP_API_KEY;

export const onLoad = async (operation: onloadOperations): Promise<void> => {
  try {
    const response = await axios.get(`${API_URL}${apikey}`);

    if (response.status !== 200) {
      console.error(`API error: ${response.status}`);
      return;
    }

    const data = response.data;
    const newsArticles: News[] = data.articles.map((article: any) => {
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
    if (operation === onloadOperations.Create) {
      const result = await collections.news_articles?.insertMany(newsArticles);

      if (result) {
        console.log(
          `Inserted ${result.insertedCount} news articles into MongoDB`
        );
      } else {
        console.error(FAILED_INSERT);
      }
    } else if (operation === onloadOperations.Update) {
      const result = await collections.news_articles?.updateMany(
        {},
        { $set: newsArticles }
      );
      if (result) {
        console.log(
          `Updated ${result.modifiedCount} news articles into MongoDB`
        );
      } else {
        console.error(FAILED_UPDATE_MANY);
      }
    } else if (operation === onloadOperations.Delete) {
      const result = await collections.news_articles?.deleteMany({});
      if (result) {
        console.log(
          `Deleted ${result.deletedCount} news articles into MongoDB`
        );
      } else {
        console.error(FAILED_DELETE_MANY);
      }
    } else if (operation === onloadOperations.None) {
      console.log(NOTHING_HAPPENED);
    }
  } catch (error) {
    console.error(error);
  } finally {
    mongoose.disconnect();
  }
};
