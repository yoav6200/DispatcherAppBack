"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newsRouter = void 0;
const express_1 = __importDefault(require("express"));
const news_handlers_1 = require("../handlers/news.handlers");
const controller_1 = require("../controllers/controller");
exports.newsRouter = express_1.default.Router();
exports.newsRouter.use(express_1.default.json());
exports.newsRouter.get('/', news_handlers_1.fetchAllNews);
exports.newsRouter.get('/:id', news_handlers_1.fetchNewsById);
exports.newsRouter.post('/', news_handlers_1.createNews);
exports.newsRouter.put('/:id', news_handlers_1.updateNewsById);
exports.newsRouter.delete('/:id', news_handlers_1.deleteNewsById);
exports.newsRouter.get('/load', controller_1.loadNewsData);
