const router = require('express').Router();
const url = require('url');

router.get('/', (req, res, next) => {
	res.redirect('/');	
});

router.get('/:url', (req, res, next) => {
	res.render('redirect', {
		url: req.params.url
	});
});

module.exports = router;
