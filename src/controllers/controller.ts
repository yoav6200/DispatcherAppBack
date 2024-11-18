import axios from 'axios';
import mongoose, { Schema } from 'mongoose';
import { API_URL, CONNECT_URL, TOP_HEADLINES } from '../constants/strings';
import 'dotenv/config';
// const clientOptions = {
//   serverApi: '1' as const,
// };
const apikey = process.env.APP_API_KEY;

const myDataSchema = new Schema({
  title: String,
  description: String,
  url: String,
  urlToImage: String,
  publishedAt: String,
  id: Number,
  author: String,
  content: String,
});

const mySchema = new Schema({
  id: { type: Number },
  data: [myDataSchema],
});

const myModel = mongoose.model('MyModel', mySchema);

const onLoad = async (): Promise<void> => {
  try {
    const response = await axios.get(`${API_URL}${apikey}`);

    if (response.status !== 200) {
      console.error(`API error: ${response.status}`);
      return;
    }

    const data = response.data;
    console.log(data);
    const result = await myModel.create({ data });

    console.log(`Data stored in MongoDB: ${result._id}`);
  } catch (error) {
    console.error(error);
  } finally {
    mongoose.disconnect();
  }
};

mongoose
  .set('strictQuery', false)
  .connect(CONNECT_URL)
  .then(async () => {
    await onLoad();
  })
  .catch((error) => {
    console.error(error);
  });
