import express from 'express';
import { favoritesController } from '../controllers/favoritesItems.controller';

export const favoritesRouter = express.Router();

favoritesRouter.use(express.json());

favoritesRouter.get('/', favoritesController.getFavorites);

favoritesRouter.get('/:id', favoritesController.getFavoritesById);

favoritesRouter.post('/', favoritesController.createFavorite);

favoritesRouter.put('/:id', favoritesController.updateFavorite);

favoritesRouter.patch('/:id', favoritesController.updateFavoritePartial);

favoritesRouter.delete('/:id', favoritesController.deleteFavorite);
