import express from'express';
import path from'path';
import cookieParser from'cookie-parser';
import logger from'morgan';
import helmet from'helmet';
import cors from'cors';

const app = express();

app.use(logger('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/index'));

module.exports = app;
