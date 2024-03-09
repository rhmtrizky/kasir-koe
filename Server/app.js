import express from 'express';
import logger from 'morgan';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { store } from './controllers/CategoryController.js';

import indexRouter from './routes/index.js';

const env = dotenv.config().parsed;
let app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.post('/categories', store);

mongoose.connect(`${env.MONGODB_URI}${env.MONGODB_HOST}:${env.MONGODB_PORT}`, {
  dbName: env.MONGODB_DB_NAME,
});
const db = mongoose.connection;
db.on('error', (err) => console.error.bind(console, 'connection error:', err));
db.once('open', function () {
  console.log('Connected to MongoDB');
});

app.listen(env.APP_PORT, () => {
  console.log(`Server app running on port ${env.APP_PORT}`);
});
