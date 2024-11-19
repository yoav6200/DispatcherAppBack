"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUser = void 0;
const validateUser = (req, res, next) => {
    const { id, name, email, password } = req.body;
    const errors = [];
    // Validate data
    if (!id) {
        errors.push('id is required');
    }
    if (!name) {
        errors.push('name is required');
    }
    if (!email) {
        errors.push('email is required');
    }
    if (!password) {
        errors.push('password cannot be empty!');
    }
    else {
        if (password.length < 8) {
            errors.push('password must be at least 8 chars long');
        }
    }
    if (errors.length) {
        res.status(422).json({
            message: 'Validation failed',
            errors,
        });
    }
    else {
        next();
    }
};
exports.validateUser = validateUser;
