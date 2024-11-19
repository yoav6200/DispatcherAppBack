"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUser = void 0;
const strings_1 = require("../../constants/strings");
const validateUser = (req, res, next) => {
    const { id, name, email, password } = req.body;
    const errors = [];
    // Validate data
    if (!id) {
        errors.push(strings_1.ID_REQUIRED);
    }
    if (!name) {
        errors.push(strings_1.NAME_REQUIRED);
    }
    if (!email) {
        errors.push(strings_1.EMAIL_REQUIRED);
    }
    if (!password) {
        errors.push(strings_1.PASSWORD_REQUIRED);
    }
    else {
        if (password.length < 8) {
            errors.push(strings_1.PASSWORD_LENGTH);
        }
    }
    if (errors.length) {
        res.status(422).json({
            message: strings_1.VALIDATION_FAILED,
            errors,
        });
    }
    else {
        next();
    }
};
exports.validateUser = validateUser;
