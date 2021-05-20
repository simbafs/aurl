const router = require('express').Router();

router.get('/', (req, res, next) => {
	res.json('hello world');
});

module.exports = router;
