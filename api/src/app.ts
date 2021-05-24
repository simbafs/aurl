import config from 'config';
import Debug from 'debug';
const debug = Debug('api:app');

import express, { ErrorRequestHandler, Request, Response, NextFunction } from'express';
import path from'path';
import cookieParser from'cookie-parser';
import logger from'morgan';
import helmet from'helmet';
import cors from'cors';
import createError from 'http-errors';

// import index route
import index from './routes/index';

// setup database
import mongoose from 'mongoose';
mongoose.connect(config.get('DB'), {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: false
}, (err) => {
	if(err) return console.error(err);
	debug('DB connect');
});
import './schema/initDB';

const app = express();

app.use(logger('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

// error handler
app.use((req, res, next) => {
	next(createError(404));
})

app.use((err: any, req: Request, res: Response) => {
	debug('errorHandler');
	res.headersSent || res.status(err.status || 500).json(err.message);
})

app.listen(config.get('port'), () => debug(`listen on ${config.get('port')}`));

module.exports = app;
