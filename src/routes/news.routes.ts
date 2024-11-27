import express from 'express';
import {
  getNews,
  getNewsById,
  createNews,
  updateNews,
  updateNewsPartial,
  deleteNewsById,
} from '../controllers/news.controller';

export const newsRouter = express.Router();

newsRouter.use(express.json());

/**
 * @api {get} /news Get all news items
 * @apiName GetAllNews
 * @apiGroup News
 *
 * @apiSuccess {Object[]} news List of news items.
 * @apiSuccess {Number} news.id ID of the news item.
 * @apiSuccess {String} news.title Title of the news item.
 * @apiSuccess {String} news.content Content of the news item.

 * @apiError {Object} 500 Internal Server Error.
 */
newsRouter.get('/', getNews);

/**
 * @api {get} /news/:id Get news item by ID
 * @apiName GetNewsById
 * @apiGroup News
 * @apiParam {Number} id News item's unique ID.
 *
 * @apiSuccess {Number} id News item's unique ID.
 * @apiSuccess {String} title News item's title.
 * @apiSuccess {String} content News item's content.

 * @apiError {Object} 404 News item not found.
 * @apiError {Object} 500 Internal Server Error.
 */
newsRouter.get('/:id', getNewsById);

/**
 * @api {post} /news Create a new news item
 * @apiName CreateNews
 * @apiGroup News
 *
 * @apiBody {String} title Title of the news item.
 * @apiBody {String} content Content of the news item.
 *
 * @apiSuccess {Number} id News item's unique ID.
 * @apiSuccess {String} title News item's title.
 * @apiSuccess {String} content News item's content.

 * @apiError {Object} 400 Bad Request.
 * @apiError {Object} 500 Internal Server Error.
 */
newsRouter.post('/', createNews);

/**
 * @api {put} /news/:id Update a news item by ID
 * @apiName UpdateNews
 * @apiGroup News
 * @apiParam {Number} id News item's unique ID.
 *
 * @apiBody {String} title Updated title of the news item.
 * @apiBody {String} content Updated content of the news item.
 *
 * @apiSuccess {Number} id News item's unique ID.
 * @apiSuccess {String} title News item's updated title.
 * @apiSuccess {String} content News item's updated content.

 * @apiError {Object} 400 Bad Request.
 * @apiError {Object} 404 News item not found.
 * @apiError {Object} 500 Internal Server Error.
 */
newsRouter.put('/:id', updateNews);

/**
 * @api {patch} /news/:id Partially update a news item by ID
 * @apiName UpdateNewsPartial
 * @apiGroup News
 * @apiParam {Number} id News item's unique ID.
 *
 * @apiBody {String} [title] Updated title of the news item (optional).
 * @apiBody {String} [content] Updated content of the news item (optional).
 *
 * @apiSuccess {Number} id News item's unique ID.
 * @apiSuccess {String} title News item's updated title.
 * @apiSuccess {String} content News item's updated content.

 * @apiError {Object} 400 Bad Request.
 * @apiError {Object} 404 News item not found.
 * @apiError {Object} 500 Internal Server Error.
 */
newsRouter.patch('/:id', updateNewsPartial);

/**
 * @api {delete} /news/:id Delete a news item by ID
 * @apiName DeleteNewsById
 * @apiGroup News
 * @apiParam {Number} id News item's unique ID.
 *
 * @apiSuccess {String} message Success message indicating the news item was deleted.
 
 * @apiError {Object} 404 News item not found.
 * @apiError {Object} 500 Internal Server Error.
 */
newsRouter.delete('/:id', deleteNewsById);
