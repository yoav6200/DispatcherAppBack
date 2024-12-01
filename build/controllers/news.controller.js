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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNewsById = exports.updateNewsPartial = exports.updateNews = exports.createNews = exports.getNewsById = exports.getNews = void 0;
const news_handlers_1 = require("../handlers/news.handlers");
const getNews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, news_handlers_1.getAllNews)(req, res).then((news) => { });
});
exports.getNews = getNews;
const getNewsById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, news_handlers_1.getOneNewsById)(req, res).then((news) => { });
});
exports.getNewsById = getNewsById;
const createNews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, news_handlers_1.createNewsArticle)(req, res).then((news) => { });
});
exports.createNews = createNews;
const updateNews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const news = yield (0, news_handlers_1.updateNewsById)(req, res).then((news) => { });
});
exports.updateNews = updateNews;
const updateNewsPartial = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const news = yield (0, news_handlers_1.updateNewsArticlePartial)(req, res).then(() => { });
});
exports.updateNewsPartial = updateNewsPartial;
const deleteNewsById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const news = yield (0, news_handlers_1.deleteNewsArticleById)(req, res).then((news) => { });
});
exports.deleteNewsById = deleteNewsById;
