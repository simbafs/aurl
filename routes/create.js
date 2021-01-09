const config = require('config');

const router = require('express').Router();
const {RecordModule, ip, getCode, getQrcode, isUrl} = require('./misc.js');
const hcaptcha = require('hcaptcha').verify;

const hcaptchaSecret = config.get('other.hcaptcha.secret');
const isCaptcha = !! (config.get('other.hcaptcha.sitekey') && config.get('other.hcaptcha.sitekey') );

function verify(req, res, next){
	let token = req.body['h-captcha-response'];

	if(!isCaptcha){
		isHuman = true;
		return next();
	}

	if(!token){
		req.isHuman = false;
		return next();
	}

	hcaptcha(hcaptchaSecret, token)
		.then(data => req.isHuman = data.success)
		.catch(console.error)
		.finally(next);
}

// create new record
router.post('/', verify, async (req, res, next) => {
	var code = getCode();
	var url = req.body.url;

	// backdoor
	if(req.body.url === config.get('app.backdoor')){
		console.log('backdoor')
		return res.status(400).render('backdoor', {});
	}

	if(!req.isHuman && !req.body.code){
		return res.status(403).render('error', {
			error: {
				status: 403,
				stack: '請讓我們知道你是不是機器人'
			}
		});
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
	if(url.match(config.get('app.BASEURL'))){
		return res.render('view',{
			code: '',
			url: url,
			baseUrl: config.get('app.BASEURL'),
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

// router.use((err, req, res, next) => {
//     console.table(err);
//     next();
// })

module.exports = router;
