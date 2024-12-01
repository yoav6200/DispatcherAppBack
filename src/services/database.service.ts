import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fetchUsersFromFireBase } from '../utils/firebase/fb_intergration_with_mongo';
import { onloadOperations } from '../app';

dotenv.config();

const DB_CONN_STRING = process.env.DB_CONN_STRING;

if (!DB_CONN_STRING) {
  throw new Error('DB_CONN_STRING environment variable is not set');
}

// Connecting to MongoDB using Mongoose
mongoose
  .connect(DB_CONN_STRING)
  .then(() => console.log('Mongoose connected to the database!'))
  .catch((err) => {
    console.error('Error connecting to the database', err);
    throw err;
  });

export const connectToDatabase = async (
  operation: onloadOperations
): Promise<void> => {
  try {
    if (operation === onloadOperations.Update) {
      await fetchUsersFromFireBase();
    }
  } catch (error) {
    console.error('Error during database operations:', error);
    throw error;
  }
};
