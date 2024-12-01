"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.News = void 0;
const mongoose_1 = require("mongoose");
// Define the Mongoose schema
const newsSchema = new mongoose_1.Schema({
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
exports.News = (0, mongoose_1.model)('news_articles', newsSchema);
