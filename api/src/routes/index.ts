import Debug from 'debug';
const debug = Debug('api:routes/index');

import express from 'express';
const router = express.Router();

import user from './user';
import url from './url';

router.get('/', (req, res, next) => {
	res.json('hello world');
});

router.use('/user', user);
router.use('/url', url);

export default router;
