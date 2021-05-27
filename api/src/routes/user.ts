import config from 'config';
import Debug from 'debug';
const debug = Debug('api:routes/user');

import express from 'express';
const router = express.Router();

import signin from './user/signin';
import signup from './user/signup';
import { auth, check } from '../lib/auth';
import passport from 'passport';
import { UserModel } from '../schema/mongoModel';

router.use('/signin', signin);
router.use('/signup', signup);

router.use(auth());

router.get('/', check([ 'getUser' ]), async (req, res, next) => {
	let users = await UserModel.find({ username: { $nin: config.get('user.doNotShow') } });
	
	return res.json(users);
});

router.get('/:username', check([ 'getUser' ]), async (req, res, next) => {
	let doNotShow = config.get('user.doNotShow') as string[];
	let { username } = req.params;

	if(doNotShow.includes(username)) return res.status(404).json({});

	let user = await UserModel.findOne({ username });
	
	return res.json(user);
});

export default router;
