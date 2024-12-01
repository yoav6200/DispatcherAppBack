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
exports.loadNewsData = void 0;
const app_1 = require("../app");
const news_service_1 = require("../services/news.service");
const strings_1 = require("../constants/strings");
const loadNewsData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const operation = req.query.operation;
        if (!operation || !Object.keys(app_1.onloadOperations).includes(operation)) {
            throw new Error(strings_1.INVALID_OPERATION);
        }
        const validOperation = app_1.onloadOperations[operation];
        yield (0, news_service_1.onLoad)(validOperation);
        res.status(200).send(`${validOperation} completed successfully'`);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).send(`Error: ${error.message}`);
        }
        else {
            res.status(500).send(strings_1.UNKNOWN_ERROR);
        }
    }
});
exports.loadNewsData = loadNewsData;
