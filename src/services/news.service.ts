import axios from 'axios';
import { News, NewsDocument } from '../models/news.models'; // Import NewsDocument type
import {
  API_URL,
  FAILED_DELETE_MANY,
  FAILED_INSERT,
  FAILED_UPDATE_MANY,
  NOTHING_HAPPENED,
} from '../constants/strings';
import { onloadOperations } from '../app';
import dotenv from 'dotenv';
dotenv.config();

const apikey = process.env.APP_API_KEY;

export const fetchNewsArticles = async (
  apiUrl: string
): Promise<NewsDocument[]> => {
  const response = await axios.get(apiUrl);

  if (response.status !== 200) {
    throw new Error(`API error: ${response.status}`);
  }

  const data = response.data;
  return data.articles.map((article: any) => ({
    title: article.title,
    description: article.description,
    url: article.url,
    urlToImage: article.urlToImage,
    publishedAt: article.publishedAt,
    author: article.author,
    content: article.content,
  }));
};

export const insertNewsArticles = async (newsArticles: NewsDocument[]) => {
  try {
    // Use the Mongoose model to insert news articles
    const result = await News.insertMany(newsArticles); // This will insert documents using the News model
    if (result) {
      console.log(`Inserted ${result.length} news articles into MongoDB`);
    } else {
      throw new Error(FAILED_INSERT);
    }
  } catch (error: any) {
    console.error('Error inserting news articles:', error.message);
    throw new Error(FAILED_INSERT);
  }
};

export const updateNewsArticles = async (newsArticles: NewsDocument[]) => {
  try {
    // Update each article
    const updatePromises = newsArticles.map(async (article) => {
      const result = await News.updateOne(
        { title: article.title },
        { $set: article },
        { upsert: true } // Insert if not exists
      );
      return result;
    });

    const results = await Promise.all(updatePromises);
    const modifiedCount = results.filter((res) => res.modifiedCount > 0).length;
    if (modifiedCount > 0) {
      console.log(`Updated ${modifiedCount} news articles in MongoDB`);
    } else {
      throw new Error(FAILED_UPDATE_MANY);
    }
  } catch (error: any) {
    console.error('Error updating news articles:', error.message);
    throw new Error(FAILED_UPDATE_MANY);
  }
};

export const deleteNewsArticles = async () => {
  try {
    // Delete all articles
    const result = await News.deleteMany({});
    if (result) {
      console.log(`Deleted ${result.deletedCount} news articles from MongoDB`);
    } else {
      throw new Error(FAILED_DELETE_MANY);
    }
  } catch (error: any) {
    console.error('Error deleting news articles:', error.message);
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
