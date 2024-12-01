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
exports.getAllUserFavorites = exports.removeFavoriteItem = exports.addFavoriteItem = exports.deleteUser = exports.updateUserPartial = exports.updateUser = exports.createUser = exports.getUserById = exports.getUsers = void 0;
const users_handlers_1 = require("../handlers/users.handlers");
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, users_handlers_1.getAllUsers)(req, res);
});
exports.getUsers = getUsers;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, users_handlers_1.getUsersbyId)(req, res);
});
exports.getUserById = getUserById;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, users_handlers_1.createOneUser)(req, res);
});
exports.createUser = createUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, users_handlers_1.updateOneUser)(req, res);
});
exports.updateUser = updateUser;
const updateUserPartial = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, users_handlers_1.updateOneUserPartial)(req, res);
});
exports.updateUserPartial = updateUserPartial;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, users_handlers_1.deleteUserById)(req, res);
});
exports.deleteUser = deleteUser;
const addFavoriteItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, users_handlers_1.addUserFavoriteItem)(req, res);
});
exports.addFavoriteItem = addFavoriteItem;
const removeFavoriteItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, users_handlers_1.removeUserFavoriteItem)(req, res);
});
exports.removeFavoriteItem = removeFavoriteItem;
const getAllUserFavorites = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, users_handlers_1.getAllFavorites)(req, res);
});
exports.getAllUserFavorites = getAllUserFavorites;
