const router = require('express').Router();
const {RecordModule, ip, getQrcode} = require('./misc.js');
require('dotenv').config();

router.post('/', (req, res, nect) => {
	res.redirect(`/view/${req.body.code.replace(/ /g, '')}`);
});

router.get('/', (req, res, next) => {
	res.cRender('view-index');
});

router.get('/:code', async (req, res, next) => {
	const code = req.params.code;
	
	const record = await RecordModule.findOne({code: code});
	
	// check if code found
	if(!record) return res.cRender('notFound', {
		code: code,
		baseUrl: process.env.BASEURL
	})

	res.cRender('view', {
		code: record.code,
		url: record.url,
		baseUrl: process.env.BASEURL,
		qrcode: await getQrcode(code)
	});
});

module.exports = router;
