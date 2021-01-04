const router = require('express').Router();
const {RecordModule, ip, getCode, getQrcode, isUrl} = require('./misc.js');
const axios = require('axios').default;
const secret = process.env.HCAPTCHA_SECRET_KEY;


require('dotenv').config();

// create new record
router.post('/', async (req, res, next) => {
	var code = getCode();
	var url = req.body.url;
	var response = req.body['h-captcha-response'];

	// backdoor
	if(req.body.url === process.env.backdoor){
		return res.status(400).render('backdoor', {});
	}

	// hcaptcha check
	if(secret){
		let data = {
			response: response,
			secret: secret
		}
		// console.log(data);
		axios.post('http://localhost:3000/verify', {
			'h-captcha-response': response
		}).then(d => console.log(d.data))
		// axios.post('https://hcaptcha.com/siteverify', data).then(data => console.log(data.data));
	}

	// url check
	//// check url is not empty
	if(req.body.url === ''){
		return res.redirect('/');
	}

	//// verify url
	if(!isUrl(url)){
		return res.render('error', {
			error: {
				status: 400,
				stack: 'invalid url',
			},
			url: url
		});
	}

	//// exclude host itself
	if(url.match(process.env.BASEURL)){
		return res.render('view',{
			code: '',
			url: url,
			baseUrl: process.env.BASEURL,
			qrcode: await getQrcode(''),
		});
	}

	// check if url is exist
	const record = await RecordModule.findOne({url: url});
	if(record && !req.body.code) return res.redirect(`/view/${record.code}`);

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
		.catch((error) => res.render('error', error));
});

module.exports = router;
