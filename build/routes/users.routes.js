"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const express_1 = __importDefault(require("express"));
const users_validations_1 = require("../utils/validations/users.validations");
const users_controller_1 = require("../controllers/users.controller");
exports.usersRouter = express_1.default.Router();
exports.usersRouter.use(express_1.default.json());
exports.usersRouter.use((req, res, next) => {
    console.log('At Middleware', req.body);
    next();
});
exports.usersRouter.get('/', users_controller_1.getUsers);
exports.usersRouter.get('/:id', users_controller_1.getUserById);
exports.usersRouter.get('/:userId/favorite', users_controller_1.getAllUserFavorites);
exports.usersRouter.post('/', users_validations_1.validateUser, users_controller_1.createUser);
exports.usersRouter.put('/:id', users_validations_1.validateUserPartial, users_controller_1.updateUser);
exports.usersRouter.patch('/:id', users_validations_1.validateUserPartial, users_controller_1.updateUserPartial);
exports.usersRouter.delete('/:id', users_controller_1.deleteUser);
exports.usersRouter.post('/:userId/favorite', users_controller_1.addFavoriteItem);
exports.usersRouter.delete('/:userId/favorite', users_controller_1.removeFavoriteItem);
