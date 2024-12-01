"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.onLoad = exports.deleteNewsArticles = exports.updateNewsArticles = exports.insertNewsArticles = exports.fetchNewsArticles = void 0;
const axios_1 = __importDefault(require("axios"));
const news_models_1 = require("../models/news.models"); // Import NewsDocument type
const strings_1 = require("../constants/strings");
const app_1 = require("../app");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const apikey = process.env.APP_API_KEY;
const fetchNewsArticles = (apiUrl) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get(apiUrl);
    if (response.status !== 200) {
        throw new Error(`API error: ${response.status}`);
    }
    const data = response.data;
    return data.articles.map((article) => ({
        title: article.title,
        description: article.description,
        url: article.url,
        urlToImage: article.urlToImage,
        publishedAt: article.publishedAt,
        author: article.author,
        content: article.content,
    }));
});
exports.fetchNewsArticles = fetchNewsArticles;
const insertNewsArticles = (newsArticles) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Use the Mongoose model to insert news articles
        const result = yield news_models_1.News.insertMany(newsArticles); // This will insert documents using the News model
        if (result) {
            console.log(`Inserted ${result.length} news articles into MongoDB`);
        }
        else {
            throw new Error(strings_1.FAILED_INSERT);
        }
    }
    catch (error) {
        console.error('Error inserting news articles:', error.message);
        throw new Error(strings_1.FAILED_INSERT);
    }
});
exports.insertNewsArticles = insertNewsArticles;
const updateNewsArticles = (newsArticles) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Update each article
        const updatePromises = newsArticles.map((article) => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield news_models_1.News.updateOne({ title: article.title }, { $set: article }, { upsert: true } // Insert if not exists
            );
            return result;
        }));
        const results = yield Promise.all(updatePromises);
        const modifiedCount = results.filter((res) => res.modifiedCount > 0).length;
        if (modifiedCount > 0) {
            console.log(`Updated ${modifiedCount} news articles in MongoDB`);
        }
        else {
            throw new Error(strings_1.FAILED_UPDATE_MANY);
        }
    }
    catch (error) {
        console.error('Error updating news articles:', error.message);
        throw new Error(strings_1.FAILED_UPDATE_MANY);
    }
});
exports.updateNewsArticles = updateNewsArticles;
const deleteNewsArticles = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Delete all articles
        const result = yield news_models_1.News.deleteMany({});
        if (result) {
            console.log(`Deleted ${result.deletedCount} news articles from MongoDB`);
        }
        else {
            throw new Error(strings_1.FAILED_DELETE_MANY);
        }
    }
    catch (error) {
        console.error('Error deleting news articles:', error.message);
        throw new Error(strings_1.FAILED_DELETE_MANY);
    }
});
exports.deleteNewsArticles = deleteNewsArticles;
const onLoad = (operation) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const apiUrl = `${strings_1.API_URL}${apikey}`;
        const newsArticles = yield (0, exports.fetchNewsArticles)(apiUrl);
        switch (operation) {
            case app_1.onloadOperations.Create:
                yield (0, exports.insertNewsArticles)(newsArticles);
                break;
            case app_1.onloadOperations.Update:
                yield (0, exports.updateNewsArticles)(newsArticles);
                break;
            case app_1.onloadOperations.Delete:
                yield (0, exports.deleteNewsArticles)();
                break;
            case app_1.onloadOperations.None:
                console.log(strings_1.NOTHING_HAPPENED);
                break;
        }
    }
    catch (error) {
        console.error(error.message);
    }
});
exports.onLoad = onLoad;
