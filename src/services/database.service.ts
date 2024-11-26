import { MongoClient, Collection } from 'mongodb';
import dotenv from 'dotenv';
import { fetchUsersFromFireBase } from '../utils/firebase/fb_intergration_with_mongo';
import { onloadOperations } from '../app';
dotenv.config();
const DB_CONN_STRING = process.env.DB_CONN_STRING;
const url = new URL(DB_CONN_STRING!);

if (!DB_CONN_STRING) {
  throw new Error('DB_CONN_STRING environment variable is not set');
}
const client = new MongoClient(DB_CONN_STRING);

export const collections: {
  news_articles?: Collection;
  users?: Collection;
} = {};

export const connectToDatabase = async (
  operation: onloadOperations
): Promise<void> => {
  try {
    await client.connect();
    const db = client.db('newsCluster');

    // Initialize collections
    collections.news_articles = db.collection('news_articles');
    collections.users = db.collection('users');
    if (operation === onloadOperations.Update) {
      fetchUsersFromFireBase(db, collections.users!);
    }
    console.log('Connected to the database!');
  } catch (error) {
    console.error('Error connecting to the database', error);
    throw error;
  }
};
