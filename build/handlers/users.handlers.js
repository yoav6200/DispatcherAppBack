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
exports.getAllFavorites = exports.removeUserFavoriteItem = exports.addUserFavoriteItem = exports.deleteUserById = exports.updateOneUserPartial = exports.updateOneUser = exports.createOneUser = exports.getUsersbyId = exports.getAllUsers = void 0;
const users_models_1 = require("../models/users.models");
const strings_1 = require("../constants/strings");
const hashPassword_1 = require("../utils/validations/hashPassword");
// Get all users
const getAllUsers = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield users_models_1.User.find();
        res.status(200).json({ users });
    }
    catch (error) {
        res.status(500).json({
            message: error instanceof Error ? error.message : 'An unknown error occurred',
        });
    }
});
exports.getAllUsers = getAllUsers;
// Get a user by ID
const getUsersbyId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield users_models_1.User.findById(id);
        if (user) {
            res.status(200).json({ user });
        }
        else {
            res.status(404).json({ message: strings_1.USER_NOT_FOUND });
        }
    }
    catch (error) {
        res.status(500).json({
            message: error instanceof Error ? error.message : 'An unknown error occurred',
        });
    }
});
exports.getUsersbyId = getUsersbyId;
// Create a user
const createOneUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, name, uid } = req.body;
        const newUser = new users_models_1.User({ email, name, uid, favoriteItems: [] });
        const savedUser = yield newUser.save();
        res.status(201).json({ message: strings_1.USER_CREATED, userId: savedUser._id });
    }
    catch (error) {
        res.status(400).json({
            message: error instanceof Error ? error.message : 'An unknown error occurred',
        });
    }
});
exports.createOneUser = createOneUser;
// Update a user fully
const updateOneUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { email, name, uid } = req.body;
    try {
        const updatedUser = yield users_models_1.User.findByIdAndUpdate(id, { email, name, uid, favoriteItems: [] }, { new: true, runValidators: true });
        if (updatedUser) {
            res.status(200).json({ message: strings_1.USER_UPDATED });
        }
        else {
            res.status(404).json({ message: strings_1.USER_NOT_FOUND });
        }
    }
    catch (error) {
        res.status(400).json({
            message: error instanceof Error ? error.message : 'An unknown error occurred',
        });
    }
});
exports.updateOneUser = updateOneUser;
// Partially update a user
const updateOneUserPartial = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updates = req.body;
    if (updates.password) {
        updates.password = yield (0, hashPassword_1.hashPassword)(updates.password);
    }
    try {
        const updatedUser = yield users_models_1.User.findByIdAndUpdate(id, updates, {
            new: true,
            runValidators: true,
        });
        if (updatedUser) {
            res.status(200).json({ message: strings_1.USER_UPDATED });
        }
        else {
            res.status(404).json({ message: strings_1.USER_NOT_FOUND });
        }
    }
    catch (error) {
        res.status(500).json({
            message: error instanceof Error ? error.message : 'An unknown error occurred',
        });
    }
});
exports.updateOneUserPartial = updateOneUserPartial;
// Delete a user by ID
const deleteUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedUser = yield users_models_1.User.findByIdAndDelete(id);
        if (deletedUser) {
            res.status(200).json({ message: `${strings_1.USER_DELETED} ${id}` });
        }
        else {
            res.status(404).json({ message: strings_1.USER_NOT_FOUND });
        }
    }
    catch (error) {
        res.status(500).json({
            message: error instanceof Error ? error.message : 'An unknown error occurred',
        });
    }
});
exports.deleteUserById = deleteUserById;
// Add a favorite item to a user
const addUserFavoriteItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const { title } = req.body;
    if (!title || typeof title !== 'string') {
        res.status(400).send({ message: '`title` is required and must be valid.' });
        return;
    }
    try {
        const updatedUser = yield users_models_1.User.findOneAndUpdate({ uid: userId }, { $push: { favoriteItems: title } }, { new: true });
        if (!updatedUser) {
            res.status(404).send({ message: 'User not found or no update made.' });
            return;
        }
        res.send({ message: 'Favorite item added successfully' });
    }
    catch (error) {
        console.error('Error occurred:', error);
        res.status(500).send({ message: 'An unknown error occurred' });
    }
});
exports.addUserFavoriteItem = addUserFavoriteItem;
// Remove a favorite item from a user
const removeUserFavoriteItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const { title } = req.body;
    if (!title || typeof title !== 'string') {
        res.status(400).send({ message: '`title` is required and must be valid.' });
        return;
    }
    try {
        const updatedUser = yield users_models_1.User.findOneAndUpdate({ uid: userId }, { $pull: { favoriteItems: title } }, { new: true });
        if (!updatedUser) {
            res
                .status(404)
                .send({ message: 'User not found or item not in favorites.' });
            return;
        }
        res.send({ message: 'Favorite item removed successfully' });
    }
    catch (error) {
        console.error('Error occurred:', error);
        res.status(500).send({ message: 'An unknown error occurred' });
    }
});
exports.removeUserFavoriteItem = removeUserFavoriteItem;
// Get all favorite items of a user
const getAllFavorites = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { uid } = req.params;
    try {
        const user = yield users_models_1.User.findOne({ uid }, { favoriteItems: 1 });
        if (!user) {
            res.status(404).send({ message: 'User not found.' });
            return;
        }
        res.status(200).send({ favoriteItems: user.favoriteItems || [] });
    }
    catch (error) {
        console.error('Error occurred while fetching favorites:', error);
        res.status(500).send({ message: 'An unknown error occurred' });
    }
});
exports.getAllFavorites = getAllFavorites;
