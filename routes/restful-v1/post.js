const router = require('express').Router();

router.post('/', (req, res, next) => {
	res.send({
		'index': '/'
	});
});

module.exports = router;
