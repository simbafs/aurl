const router = require('express').Router();
const {ip, RecordModule} = require('./misc.js');
const mongoose = require('mongoose');

// router
const viewRouter = require('./view.js');
const createRouter = require('./create.js');

// load env
require('dotenv').config();

// connect to DB
mongoose.connect(process.env.DB, {
	useNewUrlParser: true,
	useUnifiedTopology: true
	}, () => {console.log('DB connected')});

// view
router.use('/view', viewRouter);

// create a new record
router.use('/c', createRouter);

router.get('/:code', async (req, res, next) => {
	const code = req.params.code;

	// check if code is exist
	const record = await RecordModule.findOne({code: code});
	if(!record) return res.status(404).cRender('notFound', {
		baseUrl: process.env.BASEURL,
		code: code
	});
	
	//redirect to url
	res.redirect(record.url);
});

/* GET home page. */
router.get('/', (req, res, next) => {
	res.cRender('index');
});


module.exports = router;
