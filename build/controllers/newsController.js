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
exports.onLoad = void 0;
const axios_1 = __importDefault(require("axios"));
const mongoose_1 = __importDefault(require("mongoose"));
const strings_1 = require("../constants/strings");
require("dotenv/config");
const news_models_1 = __importDefault(require("../models/news.models"));
const database_service_1 = require("../services/database.service");
const app_1 = require("../app");
const apikey = process.env.APP_API_KEY;
const onLoad = (operation) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const response = yield axios_1.default.get(`${strings_1.API_URL}${apikey}`);
        if (response.status !== 200) {
            console.error(`API error: ${response.status}`);
            return;
        }
        const data = response.data;
        const newsArticles = data.articles.map((article) => {
            return new news_models_1.default(article.title, article.description, article.url, article.urlToImage, article.publishedAt, article.author, article.content);
        });
        if (operation === app_1.onloadOperations.Create) {
            const result = yield ((_a = database_service_1.collections.news_articles) === null || _a === void 0 ? void 0 : _a.insertMany(newsArticles));
            if (result) {
                console.log(`Inserted ${result.insertedCount} news articles into MongoDB`);
            }
            else {
                console.error('Failed to insert news articles');
            }
        }
        else if (operation === app_1.onloadOperations.Update) {
            const result = yield ((_b = database_service_1.collections.news_articles) === null || _b === void 0 ? void 0 : _b.updateMany({}, { $set: newsArticles }));
            if (result) {
                console.log(`Updated ${result.modifiedCount} news articles into MongoDB`);
            }
            else {
                console.error('Failed to Update news articles');
            }
        }
        else if (operation === app_1.onloadOperations.Delete) {
            const result = yield ((_c = database_service_1.collections.news_articles) === null || _c === void 0 ? void 0 : _c.deleteMany({}));
            if (result) {
                console.log(`Deleted ${result.deletedCount} news articles into MongoDB`);
            }
            else {
                console.error('Failed to delete news articles');
            }
        }
        else if (operation === app_1.onloadOperations.None) {
            console.log('No operation performed');
        }
    }
    catch (error) {
        console.error(error);
    }
    finally {
        mongoose_1.default.disconnect();
    }
});
exports.onLoad = onLoad;
