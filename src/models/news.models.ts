import { Schema, model, Document } from 'mongoose';

// Define the interface for the News document (i.e., the structure of the document)
export interface NewsDocument extends Document {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: Date;
  author: string;
  content: string;
}

// Define the Mongoose schema
const newsSchema = new Schema<NewsDocument>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  url: { type: String, required: true },
  urlToImage: { type: String, required: true },
  publishedAt: { type: Date, required: true },
  id: { type: Number, required: false },
  author: { type: String, required: true },
  content: { type: String, required: true },
});

// Create and export the Mongoose model
export const News = model<NewsDocument>('news_articles', newsSchema);
