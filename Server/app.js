import express from 'express';
import logger from 'morgan';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import indexRouter from './routes/index.js';
import cors from 'cors';
import { connection } from './connection.js';

const env = dotenv.config().parsed;
let app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);

app.use('/', indexRouter);

// connect to mongodb
connection();

app.listen(env.APP_PORT, () => {
  console.log(`Server app running on port ${env.APP_PORT}`);
});
