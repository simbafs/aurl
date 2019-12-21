const router = require('express').Router();
const Qrcode = require('qrcode');
const base58 = require('base-58');
const crypto = require('crypto');
const auth = require('./auth.js');
const {RecordModule} = require('../schema/record.js');
require('dotenv').config();

// functions
//// get qrcode
const getQrcode = async (code) => {
	var qrcode;
	await Qrcode.toDataURL(`${process.env.BASEURL}/${code}`)
		.then((url) => qrcode = url);
	return qrcode;
}

//// get random code
const getCode = () => base58.encode(crypto.randomBytes(4));

//// get ip
const ip = (req) => (req.headers['x-forwarded-for'] || req.connection.remoteAddress).replace('::ffff:', '');

//// verify url
const isUrl = (url) => {
	let parsed = require('url').parse(url);
	return (parsed.protocol && parsed.host);
};

// create new record
router.post('/', async (req, res, next) => {
	var code = getCode();
	var url = req.body.url;
	var prasedUrl = require('url').parse(url);

	// backdoor
	if(req.body.url === process.env.backdoor){
		return res.status(400).cookie('token', auth.token(ip(req))).render('backdoor', {
			title: 'URL Shortener Backdoor',
			ip: ip(req)
		});
	}

	// url check
	//// check url is not empty
	if(req.body.url === ''){
		return res.redirect('/');
	}

	//// verify url
	if(!( prasedUrl.host &&
		prasedUrl.hostname &&
		prasedUrl.pathname && 
		prasedUrl.protocol &&
		prasedUrl.slashes
	)) return res.render('error', {
		error: {
			status: 400,
			stack: 'invalid url'
		}
	})

	//// exclude ckcsc.net
	if(url.match(process.env.BASEURL)){
		return res.render('code',{
			title: 'url shortener',
			code: '',
			url: url,
			baseUrl: process.env.BASEURL,
			qrcode: await getQrcode(''),
			ip: ip(req)
		});
	}

	// check if url is exist
	const record = await RecordModule.findOne({url: url});
	if(record) return res.redirect(`/view/${record.code}`);

	// custom code in backdoor
	if(auth.verify(req.cookies.token) && req.body.code){
		code = req.body.code;
		res.clearCookie('token');
	}

	// save record
	const recode = new RecordModule({
		code: code,
		url: url,
		ip: ip(req)
	});

	await recode.save()
		.then(async () => res.redirect(`/view/${code}`))
		.catch((e) => res.render('error', e));
});

module.exports = router;
