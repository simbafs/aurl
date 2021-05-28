import config from 'config';

import Debug from 'debug';
const debug = Debug('api:routes/url');

import express from 'express';
const router = express.Router();

import { auth, check, isUserPermited } from '../lib/auth';
import isURL from 'validator/lib/isURL';
import errorMsg from '../lib/errorMsg';
import { randomCode } from '../lib/code';
import { UrlModel } from '../schema/mongoModel';
import mongoose from 'mongoose';

router.use(auth());

router.get('/', (req, res, next) => {
	res.json(req.user);
});

router.post('/', async (req, res, next) => {
	let { url, code } = req.body;
	let user = req.user;
	let canCustomCode = user && user.permission.includes('customCode');
		debug({ username: user.username, t: user.username === config.get('guest.username') });
	let state = user.username === config.get('guest.username') 
		? 'unsafe' 
		: user.verified 
			? 'verified' 
			: 'unverifyed';

	let  error = errorMsg(res);
	// check url
	if(!isURL(url, {
		allow_underscores: true,
		disallow_auth: true,
		host_blacklist: config.get('blacklist.host')
	})) error.push('url format error');

	if(error.end()) return;

	// TODO: if this user has a same url record before and the code is randomly generate,
	//       do not create a new one, use the old one instead
	if(!canCustomCode || !code) code = await randomCode();

	let owner = mongoose.Types.ObjectId(req.user._id);
	let Url = await UrlModel.create({ url, code, owner, state });

	return res.json(Url);
});

// return info, no redirect
router.get('/:code', async (req, res, next) => {
	let url = await UrlModel.findOneAndUpdate({ code: req.params.code }, {
		$inc: { click: 1 }
	}, { new: true });
	if(!url) return res.status(400).json('not found');

	let user = req.user;
	let body = {
		state: url.state,
		url: url.url,
		code: url.code,
		click: 0,
		owner: 0

	}

	// check permission(owner or getUrl)
	if(user.permission.includes('getUrl') || user.id === url.owner){
		body.click = url.click;
		body.owner = url.owner;
	}

	return res.json(body);
});

// redirect 
router.get('/r/:code', async (req, res, next) => {
	let url = await UrlModel.findOneAndUpdate({ code: req.params.code }, {
		$inc: { click: 1 }
	}, { new: true });
	if(!url) return res.status(400).json('not found');
	
	return res.redirect(url.url);
});


export default router;
