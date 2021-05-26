import config from 'config';

import Debug from 'debug';
const debug = Debug('api:routes');

import express from 'express';
const router = express.Router();

import sign from '../../lib/jwt';
import passport from 'passport';
import '../../lib/passport';
import { pick } from '../../lib/user';

router.post('/', async (req, res, next) => {
	passport.authenticate('signin', async (err, user, info) => {
		try {
			if (err || !user) return res.status(500).json({ err, info });

			req.login(user, { session: false  }, async (error) => {
				if (error) return res.status(400).json(error);

				const token = sign({ user: pick(user) });

				return res.json({ token });
			});
		} catch (e) {
			return next(e);
		}
	})(req, res, next);
});

export default router;
