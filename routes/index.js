const router = require('express').Router();
const crypto = require('crypto');
const base58 = require('base-58');
const {RecordModule} = require('../schema/record.js');
const mongoose = require('mongoose');
const Qrcode = require('qrcode');

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

/* GET home page. */
router.get('/', (req, res, next) => {
	res.render('index', { title: 'URL shortener' });
});

router.get('/:code', async (req, res, next) => {
	const code = req.params.code;

	// check if code is exist
	const record = await RecordModule.findOne({code: code});
	if(!record) return res.status(404).render('notFound', {
		code: code
	});
	
	//redirect to url
	res.redirect(record.url);
});


// create a new record
router.post('/c', async (req, res, next) => {
	const code = getCode();
	const url = req.body.url;

	// check url is valid
	if(!isUrl(req.body.url)){
		res.status(400).send('invalid url');
	}

	// check if url is exist
	
	const record = await RecordModule.findOne({url: url});
	if(record) return res.render('code', {
		title: 'url shortener',
		code: record.code,
		url: record.url,
		baseUrl: process.env.BASEURL
	});

	// save record
	const recode = new RecordModule({
		code: code,
		url: url
	});
	var qrcode;
	await Qrcode.toDataURL('https://url.ckcsc.net/${code}')
		.then((err, url) => qrcode = url);

	console.log(qrcode);
	await recode.save().then(() => {
		res.render('code', {
			title: 'url shortener',
			code: code,
			url: url,
			baseUrl: process.env.BASEURL,
			qrcode: qrcode
		});
	})
	.catch((e)=>{
		res.render('error', e);	
	});
});

module.exports = router;
