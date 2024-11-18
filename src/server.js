"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = require("dotenv");
var express = require('express');
dotenv.config();
var app = express();
var PORT = process.env.PORT;
app.get('/', function (request, response) {
    response.status(200).send('Hello World');
});
app
    .listen(PORT, function () {
    console.log('Server running at PORT: ', PORT);
})
    .on('error', function (error) {
    throw new Error(error.message);
});
