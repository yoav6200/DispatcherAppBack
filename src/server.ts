import express, { Request, Response } from 'express';
import 'dotenv/config';
import mongoose from 'mongoose';
import controller from './Controller/controller';
mongoose.set('strictQuery', false);

const app = express();

const PORT = process.env.PORT;

app.get('/', (request: Request, response: Response) => {
  response.status(200).send('Hello World');
});

app
  .listen(PORT, () => {
    console.log('Server running at PORT: ', PORT);
  })
  .on('error', (error) => {
    throw new Error(error.message);
  });
