const router = require('express').Router();
const crypto = require('crypto');
const base58 = require('base-58');
const {RecordModule} = require('../schema/record.js');
const mongoose = require('mongoose');

// load env
require('dotenv').config();

// connect to DB
mongoose.connect(process.env.DB, {
	useNewUrlParser: true,
	useUnifiedTopology: true
	}, () => {console.log('DB connected')});;

// functions
const isUrl = (url) => {
	let parsed = require('url').parse(url);
	return (parsed.protocol && parsed.host);
};

const getCode = () => base58.encode(crypto.randomBytes(4));

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.get('/:code', async (req, res, next) => {
  // check if code is exist
  const record = await RecordModule.findOne({code: req.params.code});
  if(!record) return res.status(404).render('error', {
    title:'page not found',
    code: req.params.code
  });
  
  //redirect to url
  res.redirect(record.url);
});

router.post('/c', async (req, res, next) => {
	const code = getCode();
	const url = req.body.url;

	// check url is valid
	if(!isUrl(req.body.url)){
		res.status(400).send('invalid url');
	}

	// check if url is exist
	

	const recode = new RecordModule({
		code: code,
		url: url
	});

	await recode.save().then(() => {
		res.render('code', {
			title: 'url shortener',
			code: code,
			url: url,
			baseUrl: process.env.BASEURL
		});
	});
});

module.exports = router;
