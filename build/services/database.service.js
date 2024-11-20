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
exports.connectToDatabase = exports.collections = void 0;
const mongodb_1 = require("mongodb");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const DB_CONN_STRING = process.env.DB_CONN_STRING;
const url = new URL(DB_CONN_STRING);
const dbName = url.pathname.replace(/^\//, '');
if (!DB_CONN_STRING) {
    throw new Error('DB_CONN_STRING environment variable is not set');
}
const client = new mongodb_1.MongoClient(DB_CONN_STRING);
exports.collections = {};
const connectToDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield client.connect();
        const db = client.db(dbName);
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
