import Debug from 'debug';
const debug = Debug('api:routes/user');

import express from 'express';
const router = express.Router();

import signin from './user/signin';
import signup from './user/signup';

router.get('/', (req, res, next) => {
	res.json('user');
});

router.use('/signin', signin);
router.use('/signup', signup);

export default router;
