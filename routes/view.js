const config = require('config');

const router = require('express').Router();
const {RecordModule, ip, getQrcode} = require('./misc.js');

router.post('/', (req, res, nect) => {
	res.redirect(`/view/${req.body.code.replace(/ /g, '')}`);
});

router.get('/', (req, res, next) => {
	res.render('view-index');
});

router.get('/:code', async (req, res, next) => {
	const code = req.params.code;
	
	const record = await RecordModule.findOne({code: code});
	
	// check if code found
	if(!record) return res.render('notFound', {
		code: code,
		baseUrl: config.get('app.BASEURL')
	})

	res.render('view', {
		code: record.code,
		url: record.url,
		baseUrl: config.get('app.BASEURL'),
		qrcode: await getQrcode(code)
	});
});

module.exports = router;
