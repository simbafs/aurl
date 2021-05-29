import config from 'config';
import Debug from 'debug';
const debug = Debug('api:routes/user');

import express from 'express';
const router = express.Router();

// route
import signin from './user/signin';
import signup from './user/signup';

router.use('/signin', signin);
router.use('/signup', signup);

// modules
import { auth, check } from '../lib/auth';
import passport from 'passport';
import { UserModel } from '../schema/mongoModel';
import hashPW from '../lib/password';

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

router.put('/:username', async (req, res, next) => {
	// is not owner or do not have 'editUser'
	if(req.user.username !== req.params.username && !req.user.permission.includes('editUser'))
		return res.status(403).json('permission denied');

	let { username } = req.params;
	let { password } = req.body;
	password = await hashPW(password);

	UserModel.findOneAndUpdate({ username }, { password }, { new: true })
	.then((user: any) => {
		debug(`change ${username}'s password`, { user });
		if(user) res.json('success');
		else res.status(404).json('user not found');
	})
	.catch(debug);
});

router.delete('/:username', (req, res, next) => {
	if(req.user.username !== req.params.username && !req.user.permission.includes('deleteUser'))
		return res.status(403).json('permission denied');

	let { username } = req.params;
	UserModel.findOneAndUpdate({ username }, { delete: true }, { new: true })
	.then((user: any) => {
		debug(`delete user ${username}`, { user });
		if(user) res.json('success');
		else res.status(404).json('user not found');
	})
	.catch(debug);
});

export default router;
