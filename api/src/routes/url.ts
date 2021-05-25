import config from 'config';

import Debug from 'debug';
const debug = Debug('api:routes/url');

import express from 'express';
const router = express.Router();

import { auth, check } from '../lib/auth';

router.get('/', auth(), (req, res, next) => {
	res.json(req.user);
});


export default router;
