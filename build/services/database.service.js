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
exports.connectToDatabase = exports.collections = void 0;
const mongodb_1 = require("mongodb");
const uri = '<your-database-uri>';
const client = new mongodb_1.MongoClient(uri);
exports.collections = {};
const connectToDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield client.connect();
        const db = client.db('<your-database-name>');
        // Initialize collections
        exports.collections.news_articles = db.collection('news_articles');
        exports.collections.users = db.collection('users');
        console.log('Connected to the database!');
    }
    catch (error) {
        console.error('Error connecting to the database', error);
        throw error;
    }
});
exports.connectToDatabase = connectToDatabase;
