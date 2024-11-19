"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.onloadOperations = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const routes_1 = __importDefault(require("./routes"));
const database_service_1 = require("./services/database.service");
const news_routes_1 = require("./routes/news.routes");
const newsController_1 = require("./controllers/newsController");
const strings_1 = require("./constants/strings");
var onloadOperations;
(function (onloadOperations) {
    onloadOperations[onloadOperations["Create"] = 0] = "Create";
    onloadOperations[onloadOperations["Update"] = 1] = "Update";
    onloadOperations[onloadOperations["Delete"] = 2] = "Delete";
    onloadOperations[onloadOperations["None"] = 3] = "None";
})(onloadOperations || (exports.onloadOperations = onloadOperations = {}));
const app = (0, express_1.default)();
const port = 3000;
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
app.use('/', routes_1.default);
(0, database_service_1.connectToDatabase)()
    .then(() => {
    app.use('/news', news_routes_1.newsRouter);
    (0, newsController_1.onLoad)(onloadOperations.None);
    app.listen(port, () => {
        console.log(`${strings_1.START}${port}`);
    });
})
    .catch((error) => {
    console.error(strings_1.CONNECTION_FAILED, error);
    process.exit();
});
exports.default = app;
