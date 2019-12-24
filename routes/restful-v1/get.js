const router = require('express').Router();

router.get('/', (req, res, next) => {
	res.send({
		index: '/'
	})
});

module.exports = router;
