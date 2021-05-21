import express from 'express';
const router = express.Router();

import Debug from 'debug';
const debug = Debug('api:route/url');

import { UrlModel, UserModel } from '../schema/mongoModel';

router.get('/', (req, res, next) => {
	res.json('url');
});	

router.post('/', async (req, res, next) => {
	const guest = await UserModel.findOne({ id: 1 });
	debug(req.body);
	let Url = await UrlModel.create({
		...req.body,
		owner: guest
	});
	res.json(Url);
});

export default router;
