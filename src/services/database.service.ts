import * as mongoDB from 'mongodb';
import * as dotenv from 'dotenv';

export const collections: { news_articles?: mongoDB.Collection } = {};
// Initialize Connection
export async function connectToDatabase() {
  dotenv.config();
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(
    process.env.DB_CONN_STRING ?? ''
  );

  await client.connect();

  const db: mongoDB.Db = client.db(process.env.DB_NAME);

  const newsCollection: mongoDB.Collection = db.collection(
    process.env.NEWS_COLLECTION_NAME ?? 'default-collection-name'
  );
  collections.news_articles = newsCollection;

  console.log(
    `Successfully connected to database: ${db.databaseName} and collection: ${newsCollection.collectionName}`
  );
}
