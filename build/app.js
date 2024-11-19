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
        console.log(`Server started at http://localhost:${port}`);
    });
})
    .catch((error) => {
    console.error('Database connection failed', error);
    process.exit();
});
exports.default = app;
