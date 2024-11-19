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
const mongoose_1 = __importDefault(require("mongoose"));
const database_service_1 = require("../services/database.service");
const strings_1 = require("../constants/strings");
const news_models_1 = __importDefault(require("../models/news.models"));
const app_1 = require("../app");
const API_URL = process.env.API_URL;
const apikey = process.env.APP_API_KEY;
const fetchNewsArticles = (apiUrl) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get(apiUrl);
    if (response.status !== 200) {
        throw new Error(`API error: ${response.status}`);
    }
    const data = response.data;
    return data.articles.map((article) => {
        return new news_models_1.default(article.title, article.description, article.url, article.urlToImage, article.publishedAt, article.author, article.content);
    });
});
exports.fetchNewsArticles = fetchNewsArticles;
const insertNewsArticles = (newsArticles) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const result = yield ((_a = database_service_1.collections.news_articles) === null || _a === void 0 ? void 0 : _a.insertMany(newsArticles));
    if (result) {
        console.log(`Inserted ${result.insertedCount} news articles into MongoDB`);
    }
    else {
        throw new Error(strings_1.FAILED_INSERT);
    }
});
exports.insertNewsArticles = insertNewsArticles;
const updateNewsArticles = (newsArticles) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const result = yield ((_a = database_service_1.collections.news_articles) === null || _a === void 0 ? void 0 : _a.updateMany({}, { $set: newsArticles }));
    if (result) {
        console.log(`Updated ${result.modifiedCount} news articles into MongoDB`);
    }
    else {
        throw new Error(strings_1.FAILED_UPDATE_MANY);
    }
});
exports.updateNewsArticles = updateNewsArticles;
const deleteNewsArticles = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const result = yield ((_a = database_service_1.collections.news_articles) === null || _a === void 0 ? void 0 : _a.deleteMany({}));
    if (result) {
        console.log(`Deleted ${result.deletedCount} news articles from MongoDB`);
    }
    else {
        throw new Error(strings_1.FAILED_DELETE_MANY);
    }
});
exports.deleteNewsArticles = deleteNewsArticles;
const onLoad = (operation) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const apiUrl = `${API_URL}${apikey}`;
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
    finally {
        mongoose_1.default.disconnect();
    }
});
exports.onLoad = onLoad;
