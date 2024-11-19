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
exports.newsRouter = void 0;
const express_1 = __importDefault(require("express"));
const mongodb_1 = require("mongodb");
const database_service_1 = require("../services/database.service");
const strings_1 = require("../constants/strings");
exports.newsRouter = express_1.default.Router();
exports.newsRouter.use(express_1.default.json());
exports.newsRouter.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const news = (yield ((_a = database_service_1.collections.news_articles) === null || _a === void 0 ? void 0 : _a.find({}).toArray()));
        res.status(200).send(news);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
}));
exports.newsRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const id = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id;
    try {
        const query = { _id: new mongodb_1.ObjectId(id) };
        const news = (yield ((_b = database_service_1.collections.news_articles) === null || _b === void 0 ? void 0 : _b.findOne(query)));
        if (news) {
            res.status(200).send(news);
        }
        else {
            res.status(404).send(` ${strings_1.UNABLE_FIND} ${req.params.id}`);
        }
    }
    catch (err) {
        res.status(404).send(`${strings_1.UNABLE_FIND} ${req.params.id}`);
    }
}));
exports.newsRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const newNews = req.body;
        const result = yield ((_a = database_service_1.collections.news_articles) === null || _a === void 0 ? void 0 : _a.insertOne(newNews));
        result
            ? res.status(201).send(`${strings_1.SUCCESSFULL_CREATE} ${result.insertedId}`)
            : res.status(500).send(`${strings_1.FAILED_CREATE}`);
    }
    catch (err) {
        console.error(err);
        res.status(400).send(err.message);
    }
}));
exports.newsRouter.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const id = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id;
    try {
        const updatedNews = req.body;
        const query = { _id: new mongodb_1.ObjectId(id) };
        const result = yield ((_b = database_service_1.collections.news_articles) === null || _b === void 0 ? void 0 : _b.updateOne(query, {
            $set: updatedNews,
        }));
        result
            ? res.status(200).send(`${strings_1.SUCCESSFULL_UPDATE} ${id}`)
            : res.status(304).send(`${strings_1.FAILED_UPDATE} ${id} `);
    }
    catch (err) {
        console.error(err.message);
        res.status(400).send(err.message);
    }
}));
exports.newsRouter.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const id = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id;
    try {
        const query = { _id: new mongodb_1.ObjectId(id) };
        const result = yield ((_b = database_service_1.collections.news_articles) === null || _b === void 0 ? void 0 : _b.deleteOne(query));
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
        console.error(err.message);
        res.status(400).send(err.message);
    }
}));
