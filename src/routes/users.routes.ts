import express, { Request, Response } from 'express';

import {
  validateUser,
  validateUserPartial,
} from '../utils/validations/users.validations';
import {
  getUsers,
  createUser,
  updateUser,
  updateUserPartial,
  deleteUser,
  getUserById,
  addFavoriteItem,
  removeFavoriteItem,
  getAllUserFavorites,
} from '../controllers/users.controller';

export const usersRouter = express.Router();

usersRouter.use(express.json());
usersRouter.use((req: Request, res: Response, next) => {
  console.log('At Middleware', req.body);
  next();
});
/**
 * @api {get} /users Get all users
 * @apiName GetUsers
 * @apiGroup Users
 *
 * @apiSuccess {Object[]} users List of users.
 *
 * @apiError {Object} 500 Internal Server Error.
 */
usersRouter.get('/', getUsers);
/**
 * @api {get} /users/:id Get a user by ID
 * @apiName GetUserById
 * @apiGroup Users
 * @apiParam {Number} id User's unique ID.
 *
 * @apiSuccess {Object} user User details.
 *
 * @apiError {Object} 404 User not found.
 * @apiError {Object} 500 Internal Server Error.
 */
usersRouter.get('/:id', getUserById);

/**
 * @api {get} /users/:userId/favorite Get all favorite items for a user
 * @apiName GetAllUserFavorites
 * @apiGroup Users
 * @apiParam {Number} userId User's unique ID.
 *
 * @apiSuccess {Object[]} favorites List of favorite items for the user.
 * @apiSuccess {String} favorites.itemId ID of the favorite item.
 * @apiSuccess {String} favorites.name Name of the favorite item.

 *  * @apiError {Object} 404 User not found or no favorites available.
 * @apiError {Object} 500 Internal Server Error.
 */
usersRouter.get('/:userId/favorite', getAllUserFavorites);
/**
 * @api {post} /users Create a new user
 * @apiName CreateUser
 * @apiGroup Users
 *
 * @apiBody {String} name Name of the user.
 * @apiBody {String} email Email of the user.
 * @apiBody {String} password Password for the user.
 *
 * @apiSuccess {Object} user Created user details.
 *
 * @apiError {Object} 400 Invalid input data.
 * @apiError {Object} 500 Internal Server Error.
 */
usersRouter.post('/', validateUser, createUser);
/**
 * @api {put} /users/:id Update user details
 * @apiName UpdateUser
 * @apiGroup Users
 * @apiParam {Number} id User's unique ID.
 *
 * @apiBody {String} [name] Name of the user.
 * @apiBody {String} [email] Email of the user.
 *
 * @apiSuccess {Object} user Updated user details.
 *
 * @apiError {Object} 404 User not found.
 * @apiError {Object} 400 Invalid input data.
 * @apiError {Object} 500 Internal Server Error.
 */
usersRouter.put('/:id', validateUserPartial, updateUser);
/**
 * @api {patch} /users/:id Partially update user details
 * @apiName UpdateUserPartial
 * @apiGroup Users
 * @apiParam {Number} id User's unique ID.
 *
 * @apiBody {String} [name] Name of the user.
 * @apiBody {String} [email] Email of the user.
 *
 * @apiSuccess {Object} user Updated user details.
 *
 * @apiError {Object} 404 User not found.
 * @apiError {Object} 400 Invalid input data.
 * @apiError {Object} 500 Internal Server Error.
 */
usersRouter.patch('/:id', validateUserPartial, updateUserPartial);
/**
 * @api {delete} /users/:id Delete a user
 * @apiName DeleteUser
 * @apiGroup Users
 * @apiParam {Number} id User's unique ID.
 *
 * @apiSuccess {String} message Success message indicating the user was deleted.
 *
 * @apiError {Object} 404 User not found.
 * @apiError {Object} 500 Internal Server Error.
 */
usersRouter.delete('/:id', deleteUser);
/**
 * @api {post} /users/:userId/favorite Add a favorite item for a user
 * @apiName AddFavoriteItem
 * @apiGroup Users
 * @apiParam {Number} userId User's unique ID.
 *
 * @apiBody {String} itemId ID of the favorite item.
 *
 * @apiSuccess {String} message Success message indicating the favorite item was added.
 *
 * @apiError {Object} 404 User not found.
 * @apiError {Object} 400 Invalid input data.
 * @apiError {Object} 500 Internal Server Error.
 */
usersRouter.post('/:userId/favorite', addFavoriteItem);
/**
 * @api {delete} /users/:userId/favorite Remove a favorite item for a user
 * @apiName RemoveFavoriteItem
 * @apiGroup Users
 * @apiParam {Number} userId User's unique ID.
 *
 * @apiBody {String} itemId ID of the favorite item.
 *
 * @apiSuccess {String} message Success message indicating the favorite item was removed.
 *
 * @apiError {Object} 404 User or favorite item not found.
 * @apiError {Object} 400 Invalid input data.
 * @apiError {Object} 500 Internal Server Error.
 */
usersRouter.delete('/:userId/favorite', removeFavoriteItem);
