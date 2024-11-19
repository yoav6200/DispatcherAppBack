"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controllers_1 = require("../controllers/users.controllers");
const users_validations_1 = require("../utils/validations/users.validations");
const router = (0, express_1.Router)();
router.get('/', users_controllers_1.getUsersController);
router.get('/:id', users_controllers_1.getUserByIdController);
router.post('/', users_validations_1.validateUser, users_controllers_1.createUserController);
router.put('/:id', users_validations_1.validateUser, users_controllers_1.updateUserController);
router.delete('/:id', users_controllers_1.deleteUserController);
exports.default = router;
