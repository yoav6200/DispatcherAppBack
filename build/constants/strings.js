"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.USER_DELETED = exports.USER_UPDATED = exports.USER_CREATED = exports.USER_NOT_FOUND = exports.VALIDATION_FAILED = exports.PASSWORD_LENGTH = exports.PASSWORD_REQUIRED = exports.EMAIL_REQUIRED = exports.NAME_REQUIRED = exports.ID_REQUIRED = exports.NOTHING_HAPPENED = exports.FAILED_DELETE_MANY = exports.FAILED_UPDATE_MANY = exports.FAILED_INSERT = exports.NOT_EXIST_REMOVE = exports.FAILED_REMOVE = exports.SUCCESSFULL_REMOVE = exports.FAILED_UPDATE = exports.SUCCESSFULL_UPDATE = exports.FAILED_CREATE = exports.SUCCESSFULL_CREATE = exports.UNABLE_FIND = exports.TOP_HEADLINES = exports.HELLO = exports.API_URL = exports.CONNECTION_SUCCESSFUL = exports.CONNECTION_FAILED = exports.START = void 0;
exports.START = 'Server started at http://localhost:';
exports.CONNECTION_FAILED = 'Database connection failed';
exports.CONNECTION_SUCCESSFUL = 'Successfully connected to database:';
exports.API_URL = 'https://newsapi.org/v2/top-headlines?q=israel&apiKey=';
exports.HELLO = 'Hello World!';
exports.TOP_HEADLINES = 'Top Headlines';
exports.UNABLE_FIND = 'Unable to find matching document with id:';
exports.SUCCESSFULL_CREATE = 'Successfully created a new news article with id';
exports.FAILED_CREATE = 'Failed to create a new news article.';
exports.SUCCESSFULL_UPDATE = 'Successfully updated news article with id';
exports.FAILED_UPDATE = 'News article not updated. id:';
exports.SUCCESSFULL_REMOVE = 'Successfully removed news article with id';
exports.FAILED_REMOVE = 'Failed to remove news article with id ';
exports.NOT_EXIST_REMOVE = 'News article does not exist. id: ';
exports.FAILED_INSERT = 'Failed to insert news articles';
exports.FAILED_UPDATE_MANY = 'Failed to Update news articles';
exports.FAILED_DELETE_MANY = 'Failed to delete news articles';
exports.NOTHING_HAPPENED = 'No operation performed';
exports.ID_REQUIRED = 'id is required';
exports.NAME_REQUIRED = 'name is required';
exports.EMAIL_REQUIRED = 'email is required';
exports.PASSWORD_REQUIRED = 'password cannot be empty!';
exports.PASSWORD_LENGTH = 'password must be at least 8 chars long';
exports.VALIDATION_FAILED = 'Validation failed';
exports.USER_NOT_FOUND = 'User not found';
exports.USER_CREATED = 'User created';
exports.USER_UPDATED = 'User updated';
exports.USER_DELETED = 'User deleted, id:';
