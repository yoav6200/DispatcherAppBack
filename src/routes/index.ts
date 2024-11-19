import { Router } from 'express';
import homeRouter from './home.routes';
import usersRouter from './users.routes';
import { newsRouter } from '../routes/news.routes';
const router = Router();

// Mount the routers
router.use('/', homeRouter);
router.use('/users', usersRouter);
router.use('/news', newsRouter);
export default router;
