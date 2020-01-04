const router = require('express').Router();
const crypto = require('crypto');
const base58 = require('base-58');
const {RecordModule} = require('../schema/record.js');
const mongoose = require('mongoose');
const Qrcode = require('qrcode');
const ip = (req) => (req.headers['x-forwarded-for'] || req.connection.remoteAddress).replace('::ffff:', '');

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

// functions
const isUrl = (url) => {
	let parsed = require('url').parse(url);
	return (parsed.protocol && parsed.host);
};

const getCode = () => base58.encode(crypto.randomBytes(4));

const getQrcode = async (code) => {
	var qrcode;
	await Qrcode.toDataURL(`${process.env.BASEURL}/${code}`)
		.then((url) => qrcode = url);
	return qrcode;
}

// view
router.use('/view', viewRouter);

// create a new record
router.use('/c', createRouter);

router.get('/:code', async (req, res, next) => {
	const code = req.params.code;

	// check if code is exist
	const record = await RecordModule.findOne({code: code});
	if(!record) return res.status(404).render('notFound', {
		appName: process.env.appName,
		title: process.env.title,
		subtitle: process.env.subtitle,
		baseUrl: process.env.BASEURL,
		code: code,
		ip: ip(req)
	});
	
	//redirect to url
	res.redirect(record.url);
});

/* GET home page. */
router.get('/', (req, res, next) => {
	res.render('index', {
		title: process.env.title,
		subtitle: process.env.subtitle,
		appName: process.env.appName,
		ip: ip(req)
	});
});


module.exports = router;
