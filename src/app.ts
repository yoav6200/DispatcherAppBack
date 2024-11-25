import express from 'express';
import cors from 'cors';

import router from './routes';
import { connectToDatabase } from './services/database.service';
import { newsRouter } from './routes/news.routes';
import { onLoad } from './services/news.service';
import {
  CONNECTION_FAILED,
  DATABASE_CONNECTED,
  START,
} from './constants/strings';
import { on } from 'events';
import helmet from 'helmet';

export enum onloadOperations {
  Create = 'Create',
  Update = 'Update',
  Delete = 'Delete',
  None = 'None',
}

const app = express();
const port = 3000;

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use('/', router);
let operation = onloadOperations.None;
connectToDatabase(operation)
  .then(async () => {
    app.use('/news', newsRouter);

    console.log(`${DATABASE_CONNECTED}`);

    // Call onLoad during startup
    try {
      await onLoad(operation);
      console.log('Initial news data operation completed');
    } catch (error) {
      console.error('Error during initial data load:', error);
    }

    app.listen(port, () => {
      console.log(`${START}${port}`);
    });
  })
  .catch((error: Error) => {
    console.error(CONNECTION_FAILED, error);
    process.exit();
  });

export default app;
