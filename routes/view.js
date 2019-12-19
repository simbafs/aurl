const router = require('express').Router();
const {RecordModule} = require('../schema/record.js');
require('dotenv').config();

const ip = (req) => (req.headers['x-forwarded-for'] || req.connection.remoteAddress).replace('::ffff:', '');
const getQrcode = async (code) => {
	const Qrcode = require('qrcode');
	var qrcode;
	await Qrcode.toDataURL(`${process.env.BASEURL}/${code}`)
		.then((url) => qrcode = url);
	return qrcode;
}

router.get('/', (req, res, next) => {
	res.redirect('/');		
});

router.get('/:code', async (req, res, next) => {
	const code = req.params.code;
	
	const record = await RecordModule.findOne({code: code});
	
	// check if code found
	if(!record) return res.render('error', {
		error: {
			status: 400,
			stack: 'code not found'
		}	
	})

	res.render('code', {
		title: 'url shortener',
		code: record.code,
		url: record.url,
		baseUrl: process.env.BASEURL,
		qrcode: await getQrcode(code),
		ip: ip(req)
	});
});

module.exports = router;
