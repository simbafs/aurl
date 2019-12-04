const router = require('express').Router();
const base58 = require('base-58');
const crypto = require('crypto');
const {RecordModule} = require('../schema/record.js');
require('dotenv').config();

// functions
const isUrl = (url) => {
	let parsed = require('url').parse(url);
	return (parsed.protocol && parsed.host);
};

const getCode = () => base58.encode(crypto.randomBytes(4));

router.get('/new', async (req, res, next) => {
	const url = req.query.u;
	const code = getCode();
	
	// check is url
	if(!isUrl(url)) return res.status(400).send({error: 'augument \'u\' is  not an url'});

	// check url
	if(!url) return res.status(400).render('error', {
		title: 'miss an augument \'u\'',
		message: 'argument \'u\' is required, please tell me where you want to go' 
	});

	// check if url is exist
	const record = await RecordModule.findOne({url: url});
	if(record) return res.send({code: record.code});
	
	// save record
	const recode = new RecordModule({
		code: code,
		url: url,
		ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
	});

	await recode.save().then(() => {
		res.send({code: code});
	})
	.catch((e)=>{
		res.send({error: e});	
	});
});

router.get('/all', async (req, res, next) => {
	if(req.cookies.admin !== process.env.admin) return next();

	var records = [];
	await RecordModule.find({}, (err, data) => {
		records.push(data);
	});
	res.send(records);
});

module.exports = router;
