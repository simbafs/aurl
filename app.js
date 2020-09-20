const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const {cRender} = require('./routes/misc.js');

const indexRouter = require('./routes/index.js');
const apiRouter = require('./routes/api.js');
const adminRouter = require('./routes/admin.js');
const errorRoutwe = require('./routes/error.js');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// load env
require('dotenv').config();

// Google Analytics
app.use((req, res, next) => {
	res.locals.GAid = process.env.GAid;
	next();
})

// functions
const ip = (req) => (req.headers['x-forwarded-for'] || req.connection.remoteAddress).replace('::ffff:', '');

// favicon setup

// app.use(logger('dev', {
//	skip: function (req, res) { return res.statusCode <  }
// }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cRender);

app.use('/admin', adminRouter);
app.use('/api', apiRouter);
app.use('/error', errorRoutwe);
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
	for(i in req) console.log(i);
	console.log('there will be some error');
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.cRender('error', err);
});

module.exports = app;
