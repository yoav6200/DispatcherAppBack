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
exports.deleteNewsArticleById = exports.updateNewsById = exports.createNewsArticle = exports.updateNewsArticlePartial = exports.getOneNewsById = exports.getAllNews = void 0;
const news_models_1 = require("../models/news.models");
const strings_1 = require("../constants/strings");
// Get all news
const getAllNews = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const news = yield news_models_1.News.find();
        res.status(200).json(news);
    }
    catch (error) {
        res
            .status(500)
            .send({ message: error.message || 'An unknown error occurred' });
    }
});
exports.getAllNews = getAllNews;
// Get news by ID
const getOneNewsById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const news = yield news_models_1.News.findById(id);
        if (news) {
            res.status(200).json(news);
        }
        else {
            res.status(404).send({ message: `${strings_1.UNABLE_FIND} ${id}` });
        }
    }
    catch (error) {
        res.status(500).send({ message: `${strings_1.UNABLE_FIND} ${id}` });
    }
});
exports.getOneNewsById = getOneNewsById;
const updateNewsArticlePartial = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updates = req.body;
    try {
        const updatedNews = yield news_models_1.News.findByIdAndUpdate(id, { $set: updates }, { new: true });
        if (updatedNews) {
            res.status(200).send({
                message: `${strings_1.SUCCESSFULL_UPDATE}`,
                updatedNews,
            });
        }
        else {
            res.status(404).send({
                message: `${strings_1.UNABLE_FIND} ${id}`,
            });
        }
    }
    catch (error) {
        res.status(400).send({
            message: error.message ||
                'An unknown error occurred while updating news article.',
        });
    }
});
exports.updateNewsArticlePartial = updateNewsArticlePartial;
// Create news
const createNewsArticle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newNews = new news_models_1.News(req.body);
        const savedNews = yield newNews.save();
        res
            .status(201)
            .send({ message: `${strings_1.SUCCESSFULL_CREATE}`, newsId: savedNews._id });
    }
    catch (error) {
        res.status(400).send({ message: error.message });
    }
});
exports.createNewsArticle = createNewsArticle;
// Update news by ID
const updateNewsById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const updatedNews = yield news_models_1.News.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        if (updatedNews) {
            res.status(200).send({ message: `${strings_1.SUCCESSFULL_UPDATE}`, updatedNews });
        }
        else {
            res.status(404).send({ message: `${strings_1.UNABLE_FIND} ${id}` });
        }
    }
    catch (error) {
        res.status(400).send({ message: error.message });
    }
});
exports.updateNewsById = updateNewsById;
// Delete news by ID
const deleteNewsArticleById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const deletedNews = yield news_models_1.News.findByIdAndDelete(id);
        if (deletedNews) {
            res.status(202).send({ message: `${strings_1.SUCCESSFULL_REMOVE}` });
        }
        else {
            res.status(404).send({ message: `${strings_1.FAILED_REMOVE} ${id}` });
        }
    }
    catch (error) {
        res.status(400).send({ message: error.message });
    }
});
exports.deleteNewsArticleById = deleteNewsArticleById;
