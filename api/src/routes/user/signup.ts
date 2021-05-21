import config from 'config';

import Debug from 'debug';
const debug = Debug('api:routes/user/signin');

import express from 'express';
const router = express.Router();

import isEmail from 'validator/lib/isEmail';
import isUUID from 'validator/lib/isUUID';
import { UserModel } from '../../schema/mongoModel';
import urlJoin from 'url-join';
import errorMsg from '../../lib/errorMsg';

router.use((req, res, next) => {
	debug(req.route);
	next();
});

router.post('/', async (req, res, next) => {
	let error = errorMsg(res);
	let { email, username, password } = req.body;

	// check email
	if(!email) error.push('missing email');
	else if(!isEmail(email)) error.push('invalid email');
	else if(await UserModel.findOne({ email })) error.push('email is used');

	// check username
	if(!username) error.push('missing username');
	else if(await UserModel.findOne({ username })) error.push('username is used');

	// check password
	if(!password) error.push('you need to set a pasword');

	// if error, send them
	if(error.end()) return;
	// NOTE: the below version will trigger error in typescript but I don't know why. It should work
	// error.end() && return;

	let user = await UserModel.create({
		username,
		email,
		password
	});

	return res.json(urlJoin(config.get('app.baseUrl'), 'user/signup/verify', user.verifyCode));

});

router.get('/verify/:verifyCode', async (req, res, next) => {
	let error = errorMsg(res);
	let { verifyCode } = req.params;
	debug({ verifyCode });

	// find user by verifyCode and update info
	if(!isUUID(verifyCode)) error.push('invalid code');
	else if(await UserModel.findOneAndUpdate({ verifyCode }, {
		verified: true,
		verifyCode: ''
	}, { new: true })) error.push('invalid code');

	if(error.end()) return;

	return res.json('verified')
});

export default router;
