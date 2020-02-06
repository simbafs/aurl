const router = require('express').Router();
const {RecordModule, ip, getCode, getQrcode, isUrl} = require('./misc.js');

require('dotenv').config();

// create new record
router.post('/', async (req, res, next) => {
	var code = getCode();
	var url = req.body.url;

	// backdoor
	if(req.body.url === process.env.backdoor){
		return res.status(400).cRender('backdoor', {});
	}

	// url check
	//// check url is not empty
	if(req.body.url === ''){
		return res.redirect('/');
	}

	//// verify url
	if(!isUrl(url)){
		return res.cRender('error', {
			error: {
				status: 400,
				stack: 'invalid url',
			},
			url: url
		});
	}

	//// exclude host itself
	if(url.match(process.env.BASEURL)){
		return res.cRender('view',{
			code: '',
			url: url,
			baseUrl: process.env.BASEURL,
			qrcode: await getQrcode(''),
		});
	}

	// check if url is exist
	const record = await RecordModule.findOne({url: url});
	if(record || req.body.code) return res.redirect(`/view/${record.code}`);

	// custom code in backdoor
	if(req.body.code){
		code = req.body.code;
	}

	// save record
	const recode = new RecordModule({
		code: code,
		url: url,
		ip: ip(req)
	});

	await recode.save()
		.then(async () => res.redirect(`/view/${code}`))
		.catch((error) => res.cRender('error', error));
});

module.exports = router;
