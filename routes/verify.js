const router = require('express').Router();
const captcha = require('express-hcaptcha');

const SECRET = process.env.HCAPTCHA_SECRET_KEY;

if(SECRET){
	router.post('/', (req, res, next) => {
		req.body.token = req.body['h-captcha-response'];
		next();
	}, captcha.middleware.validate(SECRET), (req, res, next) => {
		res.json({
			message: 'verified!',
			hcaptcha: req.hcaptcha
		});
	});
}

module.exports = router;
