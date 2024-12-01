"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const home_routes_1 = __importDefault(require("./home.routes"));
const users_routes_1 = require("./users.routes");
const news_routes_1 = require("../routes/news.routes");
const router = (0, express_1.Router)();
// Mount the routers
router.use('/', home_routes_1.default);
router.use('/users', users_routes_1.usersRouter);
router.use('/news', news_routes_1.newsRouter);
exports.default = router;
