import { MongoClient, Collection } from 'mongodb';

const uri = '<your-database-uri>';
const client = new MongoClient(uri);

export const collections: {
  news_articles?: Collection;
  users?: Collection;
} = {};

export const connectToDatabase = async () => {
  try {
    await client.connect();
    const db = client.db('<your-database-name>');

    // Initialize collections
    collections.news_articles = db.collection('news_articles');
    collections.users = db.collection('users');

    console.log('Connected to the database!');
  } catch (error) {
    console.error('Error connecting to the database', error);
    throw error;
  }
};
