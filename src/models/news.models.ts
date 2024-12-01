// src/models/news.models.ts
import { Schema, model } from 'mongoose';

export interface News {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: Date;
  id: number | null;
  author: string;
  content: string;
}

const newsSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  url: { type: String, required: true },
  urlToImage: { type: String, required: true },
  publishedAt: { type: Date, required: true },
  id: { type: Number, required: false },
  author: { type: String, required: true },
  content: { type: String, required: true },
});

export const News = model<News>('news_articles', newsSchema);
