import config from 'config';

import Debug from 'debug';
const debug = Debug('api:routes/user/signup');

import express from 'express';
const router = express.Router();

import isEmail from 'validator/lib/isEmail';
import isVerifyCode from 'validator/lib/isUUID';
import { UserModel } from '../../schema/mongoModel';
import urlJoin from 'url-join';
import errorMsg from '../../lib/errorMsg';
import sendEmail from '../../lib/sendEmail';
import trimEmail from '../../lib/trimEmail';

// router.use((req, res, next) => {
//     debug(req.route);
//     next();
// });

router.post('/', async (req, res, next) => {
	let error = errorMsg(res);
	let { email, username, password, permission } = req.body;

	// trim imput
	email = trimEmail(email);
	username = username.trim();
	password = password.trim();

	let a:any;
	// check email
	debug('checking email', email);
	if(!email) error.push('missing email');
	else if(!isEmail(email)) error.push('invalid email');
	else if(await UserModel.findOne({ email })) error.push('email is used');
	debug('email is fine');

	// check username
	debug('checking username', username);
	if(!username) error.push('missing username');
	else if(await UserModel.findOne({ username })) error.push('username is used');
	debug('username is fine');

	// check password
	debug('checking password');
	if(!password) error.push('you need to set a pasword');
	debug('password is fine');

	// check and format permission
	debug('ckecking and formating permissions');
	if(permission){
		permission = JSON.parse(permission);
		if(!Array.isArray(permission) || !permission.every(i => typeof i === 'string')){
			permission = null;
		}
	}
	debug('permission is fine');

	// if error, send them
	if(error.end()) return;
	// NOTE: the below version will trigger error in typescript but I don't know why. It should work
	// error.end() && return;

	debug({ username, email, password, permission });
	let user = await UserModel.create({ username, email, password, permission });

	let verifyUrl = urlJoin(config.get('baseUrl'), 'user/signup/verify', user.verifyCode);

	let info = await sendEmail({ username, email, verifyUrl });
	return res.json(info);
});

router.get('/verify/:verifyCode', async (req, res, next) => {
	let error = errorMsg(res);
	let { verifyCode } = req.params;
	debug({ verifyCode });

	// find user by verifyCode and update info
	debug('checking verifyCode', verifyCode);
	if(!isVerifyCode(verifyCode)) error.push('this is not a code');
	else if(!(await UserModel.findOneAndUpdate({ verifyCode }, {
		verified: true,
		verifyCode: ''
	}, { new: true }))) error.push('invalid code');

	if(error.end()) return;

	return res.json('verified')
});

export default router;
