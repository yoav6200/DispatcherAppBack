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
exports.deleteUserHandler = exports.updateUserHandler = exports.createUserHandler = exports.getUserByIdHandler = exports.getUsersHandler = void 0;
const mongodb_1 = require("mongodb");
const database_service_1 = require("../services/database.service");
const users_models_1 = __importDefault(require("../models/users.models"));
const strings_1 = require("../constants/strings");
const getUsersHandler = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const users = yield ((_a = database_service_1.collections.users) === null || _a === void 0 ? void 0 : _a.find({}).toArray());
        res.status(200).json({ users });
    }
    catch (error) {
        res
            .status(500)
            .json({
            message: error instanceof Error ? error.message : 'An unknown error occurred',
        });
    }
});
exports.getUsersHandler = getUsersHandler;
const getUserByIdHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const id = req.params.id;
    try {
        const user = yield ((_a = database_service_1.collections.users) === null || _a === void 0 ? void 0 : _a.findOne({ _id: new mongodb_1.ObjectId(id) }));
        if (user) {
            res.status(200).json({ user });
        }
        else {
            res.status(404).json({ message: strings_1.USER_NOT_FOUND });
        }
    }
    catch (error) {
        res
            .status(500)
            .json({
            message: error instanceof Error ? error.message : 'An unknown error occurred',
        });
    }
});
exports.getUserByIdHandler = getUserByIdHandler;
const createUserHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { email, password } = req.body;
        const newUser = new users_models_1.default(email, password);
        const result = yield ((_a = database_service_1.collections.users) === null || _a === void 0 ? void 0 : _a.insertOne(newUser));
        if (result) {
            res
                .status(201)
                .json({ message: strings_1.USER_CREATED, userId: result.insertedId });
        }
        else {
            res.status(500).json({ message: 'Failed to create user.' });
        }
    }
    catch (error) {
        res
            .status(400)
            .json({
            message: error instanceof Error ? error.message : 'An unknown error occurred',
        });
    }
});
exports.createUserHandler = createUserHandler;
const updateUserHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const id = req.params.id;
    try {
        const { email, password } = req.body;
        const updatedUser = new users_models_1.default(email, password);
        const result = yield ((_a = database_service_1.collections.users) === null || _a === void 0 ? void 0 : _a.updateOne({ _id: new mongodb_1.ObjectId(id) }, { $set: updatedUser }));
        if (result === null || result === void 0 ? void 0 : result.modifiedCount) {
            res.status(200).json({ message: strings_1.USER_UPDATED });
        }
        else {
            res.status(404).json({ message: strings_1.USER_NOT_FOUND });
        }
    }
    catch (error) {
        res
            .status(400)
            .json({
            message: error instanceof Error ? error.message : 'An unknown error occurred',
        });
    }
});
exports.updateUserHandler = updateUserHandler;
const deleteUserHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const id = req.params.id;
    try {
        const result = yield ((_a = database_service_1.collections.users) === null || _a === void 0 ? void 0 : _a.deleteOne({
            _id: new mongodb_1.ObjectId(id),
        }));
        if (result === null || result === void 0 ? void 0 : result.deletedCount) {
            res.status(200).json({ message: strings_1.USER_DELETED });
        }
        else {
            res.status(404).json({ message: strings_1.USER_NOT_FOUND });
        }
    }
    catch (error) {
        res
            .status(500)
            .json({
            message: error instanceof Error ? error.message : 'An unknown error occurred',
        });
    }
});
exports.deleteUserHandler = deleteUserHandler;
