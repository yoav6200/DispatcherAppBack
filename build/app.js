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
exports.onloadOperations = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const database_service_1 = require("./services/database.service");
const news_routes_1 = require("./routes/news.routes");
const news_service_1 = require("./services/news.service");
const strings_1 = require("./constants/strings");
const helmet_1 = __importDefault(require("helmet"));
var onloadOperations;
(function (onloadOperations) {
    onloadOperations["Create"] = "Create";
    onloadOperations["Update"] = "Update";
    onloadOperations["Delete"] = "Delete";
    onloadOperations["None"] = "None";
})(onloadOperations || (exports.onloadOperations = onloadOperations = {}));
const app = (0, express_1.default)();
const port = 3000;
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
app.use('/', routes_1.default);
let operation = onloadOperations.None;
(0, database_service_1.connectToDatabase)(operation)
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    app.use('/news', news_routes_1.newsRouter);
    console.log(`${strings_1.DATABASE_CONNECTED}`);
    // Call onLoad during startup
    try {
        yield (0, news_service_1.onLoad)(operation);
        console.log('Initial news data operation completed');
    }
    catch (error) {
        console.error('Error during initial data load:', error);
    }
    app.listen(port, () => {
        console.log(`${strings_1.START}${port}`);
    });
}))
    .catch((error) => {
    console.error(strings_1.CONNECTION_FAILED, error);
    process.exit();
});
exports.default = app;
