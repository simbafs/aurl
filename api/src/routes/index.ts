import express from 'express';
const router = express.Router();

const user = require('./user');
const url = require('./url');

router.get('/', (req, res, next) => {
	res.json('hello world');
});

router.use('/user', user);
router.use('/url', url);

module.exports = router;
