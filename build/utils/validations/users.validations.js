"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserPartial = exports.validateUser = void 0;
const joi_1 = __importDefault(require("joi"));
const strings_1 = require("../../constants/strings");
const userSchema = joi_1.default.object({
    email: joi_1.default.string().email().required().messages({
        'string.email': strings_1.INVALID_EMAIL,
        'any.required': strings_1.EMAIL_REQUIRED,
    }),
    name: joi_1.default.string().allow('').messages({}),
    uid: joi_1.default.string().required().messages({
        'any.required': 'UID is required',
    }),
});
const userPartialSchema = joi_1.default.object({
    email: joi_1.default.string().email().messages({
        'string.email': strings_1.INVALID_EMAIL,
    }),
    password: joi_1.default.string().min(8).messages({
        'string.min': strings_1.PASSWORD_LENGTH,
    }),
    name: joi_1.default.string().allow('').messages({}),
    uid: joi_1.default.string().messages({}),
}).or('email', 'password', 'name', 'uid');
const validateUser = (req, res, next) => {
    const { error } = userSchema.validate(req.body);
    if (error) {
        res.status(422).json({
            message: strings_1.VALIDATION_FAILED,
            errors: error.details.map((detail) => detail.message),
        });
    }
    else {
        next();
    }
};
exports.validateUser = validateUser;
const validateUserPartial = (req, res, next) => {
    const { error } = userPartialSchema.validate(req.body);
    if (error) {
        res.status(422).json({
            message: strings_1.VALIDATION_FAILED,
            errors: error.details.map((detail) => detail.message),
        });
    }
    else {
        next();
    }
};
exports.validateUserPartial = validateUserPartial;
