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
exports.connectToDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const fb_intergration_with_mongo_1 = require("../utils/firebase/fb_intergration_with_mongo");
const app_1 = require("../app");
dotenv_1.default.config();
const DB_CONN_STRING = process.env.DB_CONN_STRING;
if (!DB_CONN_STRING) {
    throw new Error('DB_CONN_STRING environment variable is not set');
}
// Connecting to MongoDB using Mongoose
mongoose_1.default
    .connect(DB_CONN_STRING)
    .then(() => console.log('Mongoose connected to the database!'))
    .catch((err) => {
    console.error('Error connecting to the database', err);
    throw err;
});
const connectToDatabase = (operation) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (operation === app_1.onloadOperations.Update) {
            yield (0, fb_intergration_with_mongo_1.fetchUsersFromFireBase)(); // No need to pass `db` anymore
        }
    }
    catch (error) {
        console.error('Error during database operations:', error);
        throw error;
    }
});
exports.connectToDatabase = connectToDatabase;
