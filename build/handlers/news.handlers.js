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
exports.deleteNewsById = exports.updateNewsById = exports.createNews = exports.fetchNewsById = exports.fetchAllNews = void 0;
const mongodb_1 = require("mongodb");
const database_service_1 = require("../services/database.service");
const strings_1 = require("../constants/strings");
const fetchAllNews = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const news = (yield ((_a = database_service_1.collections.news_articles) === null || _a === void 0 ? void 0 : _a.find({}).toArray()));
        res.status(200).send(news);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
});
exports.fetchAllNews = fetchAllNews;
const fetchNewsById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const id = req.params.id;
    try {
        const query = { _id: new mongodb_1.ObjectId(id) };
        const news = (yield ((_a = database_service_1.collections.news_articles) === null || _a === void 0 ? void 0 : _a.findOne(query)));
        if (news) {
            res.status(200).send(news);
        }
        else {
            res.status(404).send(`${strings_1.UNABLE_FIND} ${id}`);
        }
    }
    catch (err) {
        res.status(500).send(`${strings_1.UNABLE_FIND} ${id}`);
    }
});
exports.fetchNewsById = fetchNewsById;
const createNews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const newNews = req.body;
        const result = yield ((_a = database_service_1.collections.news_articles) === null || _a === void 0 ? void 0 : _a.insertOne(newNews));
        result
            ? res.status(201).send(`${strings_1.SUCCESSFULL_CREATE} ${result.insertedId}`)
            : res.status(500).send(`${strings_1.FAILED_CREATE}`);
    }
    catch (err) {
        res.status(400).send(err.message);
    }
});
exports.createNews = createNews;
const updateNewsById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const id = req.params.id;
    try {
        const updatedNews = req.body;
        const query = { _id: new mongodb_1.ObjectId(id) };
        const result = yield ((_a = database_service_1.collections.news_articles) === null || _a === void 0 ? void 0 : _a.updateOne(query, {
            $set: updatedNews,
        }));
        (result === null || result === void 0 ? void 0 : result.modifiedCount)
            ? res.status(200).send(`${strings_1.SUCCESSFULL_UPDATE} ${id}`)
            : res.status(304).send(`${strings_1.FAILED_UPDATE} ${id}`);
    }
    catch (err) {
        res.status(400).send(err.message);
    }
});
exports.updateNewsById = updateNewsById;
const deleteNewsById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const id = req.params.id;
    try {
        const query = { _id: new mongodb_1.ObjectId(id) };
        const result = yield ((_a = database_service_1.collections.news_articles) === null || _a === void 0 ? void 0 : _a.deleteOne(query));
        if (result && result.deletedCount) {
            res.status(202).send(`${strings_1.SUCCESSFULL_REMOVE} ${id}`);
        }
        else if (!result) {
            res.status(400).send(`${strings_1.FAILED_REMOVE}${id}`);
        }
        else if (!result.deletedCount) {
            res.status(404).send(`${strings_1.NOT_EXIST_REMOVE} ${id}`);
        }
    }
    catch (err) {
        res.status(400).send(err.message);
    }
});
exports.deleteNewsById = deleteNewsById;
