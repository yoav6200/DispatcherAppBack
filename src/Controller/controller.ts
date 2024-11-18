import axios from 'axios';
import mongoose, { Schema } from 'mongoose';
import { API_URL, CONNECT_URL } from '../constants/strings';
import 'dotenv/config';
const apikey = process.env.APP_API_KEY;

interface MyModelInterface {
  id: number;
  data: MyData[];
}
interface MyData {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  id: number;
  author: string;
  content: string;
}

// Create a new schema object
const mySchema = new Schema({
  id: { type: Number },
  data: { type: Object },
});

// Create the MyModel model
const myModel = mongoose.model<MyModelInterface>('MyModel', mySchema);

// Connect to MongoDB using Mongoose

// Define the onLoad function
const onLoad = async (): Promise<void> => {
  try {
    // Make API request to external API
    console.log(`${API_URL}${apikey}`);
    const response = await axios.get(`${API_URL}${apikey}`);

    // Store response data in MongoDB collection
    const data = response.data;
    const result = await myModel.create({ name: 'top-headlines', data: data });

    console.log(`Data stored in MongoDB: ${result._id}`);
  } catch (error) {
    console.error(error);
  } finally {
    // Close MongoDB connection
    mongoose.disconnect();
  }
};

// Call the onLoad function
mongoose
  .set('strictQuery', false)
  .connect(CONNECT_URL)
  .then(async () => {
    await onLoad();
  })
  .catch((error) => {
    console.error(error);
  });
