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

router.get('/', auth(), (req, res, next) => {
	res.json(req.user);
});

router.post('/', auth(), async (req, res, next) => {
	let { url, code } = req.body;
	let user = req.user;
	let canCustomCode = user && user.permission.includes('customCode');

	let  error = errorMsg(res);
	// check url
	if(!isURL(url, {
		allow_underscores: true,
		disallow_auth: true,
		host_blacklist: config.get('blacklist.host')
	})) error.push('url format error');
	
	if(error.end()) return;

	if(!canCustomCode || !code) code = await randomCode();

	let owner = mongoose.Types.ObjectId(req.user._id);
	let Url = await UrlModel.create({ url, code, owner });

	return res.json(Url);
});

router.get('/:code', async (req, res, next) => {
	let url = await UrlModel.findOne({ code: req.params.code });

	return res.json(url);
});


export default router;
