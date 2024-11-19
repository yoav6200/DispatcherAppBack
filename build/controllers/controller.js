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
const apikey = process.env.APP_API_KEY;
const onLoad = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const response = yield axios_1.default.get(`${strings_1.API_URL}${apikey}`);
        if (response.status !== 200) {
            console.error(`API error: ${response.status}`);
            return;
        }
        const data = response.data;
        const newsArticles = data.articles.map((article) => {
            return new news_models_1.default(article.title, article.description, article.url, article.urlToImage, article.publishedAt, article.author, article.content, article.id);
        });
        const result = yield ((_a = database_service_1.collections.news_articles) === null || _a === void 0 ? void 0 : _a.insertMany(newsArticles));
        if (result) {
            console.log(`Inserted ${result.insertedCount} news articles into MongoDB`);
        }
        else {
            console.error('Failed to insert news articles');
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
