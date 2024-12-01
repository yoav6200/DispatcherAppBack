"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newsRouter = void 0;
const express_1 = __importDefault(require("express"));
const news_controller_1 = require("../controllers/news.controller");
exports.newsRouter = express_1.default.Router();
exports.newsRouter.use(express_1.default.json());
exports.newsRouter.get('/', news_controller_1.getNews);
exports.newsRouter.get('/:id', news_controller_1.getNewsById);
exports.newsRouter.post('/', news_controller_1.createNews);
exports.newsRouter.put('/:id', news_controller_1.updateNews);
exports.newsRouter.patch('/:id', news_controller_1.updateNewsPartial);
exports.newsRouter.delete('/:id', news_controller_1.deleteNewsById);
