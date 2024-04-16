import mongoose from 'mongoose';
import dotenv from 'dotenv';

mongoose.Promise = global.Promise;
dotenv.config();

// const { DB_HOST, DB_NAME, DB_PASS, DB_PORT, DB_USER } = process.env;

const connectToDatabase = async (): Promise<void> => {

  // await mongoose.connect(`mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}`, options);
  await mongoose.connect('mongodb://127.0.0.1/mean-devR04')
    .then(() => console.log('Connected Successfully to MongoDB 127001'))
    .catch((err) => console.log(err.reason));
  };

export { connectToDatabase };



