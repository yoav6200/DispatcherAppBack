import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import router from './routes';
import { connectToDatabase } from './services/database.service';
import { newsRouter } from './routes/news.routes';
import { onLoad } from './controllers/newsController';
export enum onloadOperations {
  Create,
  Update,
  Delete,
  None,
}
const app = express();
const port = 3000;

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use('/', router);

connectToDatabase()
  .then(() => {
    app.use('/news', newsRouter);

    onLoad(onloadOperations.None);
    app.listen(port, () => {
      console.log(`Server started at http://localhost:${port}`);
    });
  })
  .catch((error: Error) => {
    console.error('Database connection failed', error);
    process.exit();
  });

export default app;
