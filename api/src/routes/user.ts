import Debug from 'debug';
const debug = Debug('api:routes/user');

import express from 'express';
const router = express.Router();

import signin from './user/signin';
import signup from './user/signup';
import { auth, check } from '../lib/auth';
import passport from 'passport';

router.use(auth());

router.get('/', (req, res, next) => {
	return res.json('user');
});

router.get('/test', check(), (req, res, next) => {
	return res.json(req.user);
});

router.get('/test2', check(['getUserasdf', 'customCode']), (req, res, next) => {
	return res.json(req.user);
})

router.get('/test3', check([ ['customCode'], ['getUrdfsl'] ]), (req, res, next) => {
	return res.json(req.user);
})

router.use('/signin', signin);
router.use('/signup', signup);

export default router;
