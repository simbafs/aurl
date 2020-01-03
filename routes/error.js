const router = require('express').Router();

router.get('/', (req, res, next) => {
	res.render('error', {
		error: {
			appName: process.env.appName,
			status: 400,
			stack: 'something'
		}
	});
});

module.exports = router;
