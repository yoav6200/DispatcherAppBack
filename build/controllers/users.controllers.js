"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserController = exports.updateUserController = exports.createUserController = exports.getUserByIdController = exports.getUsersController = void 0;
const users_models_1 = require("../models/users.models");
const strings_1 = require("../constants/strings");
const getUsersController = (req, res) => {
    const users = (0, users_models_1.getUsers)();
    res.status(200).json({ users });
};
exports.getUsersController = getUsersController;
const getUserByIdController = (req, res) => {
    const id = parseInt(req.params.id, 10);
    const user = (0, users_models_1.getUserById)(id);
    if (user) {
        res.status(200).json({ user });
    }
    else {
        res.status(404).json({ message: strings_1.USER_NOT_FOUND });
    }
};
exports.getUserByIdController = getUserByIdController;
const createUserController = (req, res) => {
    const user = req.body;
    (0, users_models_1.createUser)(user);
    res.status(201).json({
        message: strings_1.USER_CREATED,
        user,
    });
};
exports.createUserController = createUserController;
const updateUserController = (req, res) => {
    const id = parseInt(req.params.id, 10);
    const userUpdate = req.body;
    userUpdate.id = id;
    (0, users_models_1.updateUser)(userUpdate);
    res.status(200).json({
        message: strings_1.USER_UPDATED,
        user: userUpdate,
    });
};
exports.updateUserController = updateUserController;
const deleteUserController = (req, res) => {
    const id = parseInt(req.params.id, 10);
    (0, users_models_1.deleteUser)(id);
    res.status(200).json({
        message: `${strings_1.USER_DELETED} ${id} `,
    });
};
exports.deleteUserController = deleteUserController;
