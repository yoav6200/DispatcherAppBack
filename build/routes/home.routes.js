"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const strings_1 = require("../constants/strings");
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    res.send(strings_1.HELLO);
});
exports.default = router;
