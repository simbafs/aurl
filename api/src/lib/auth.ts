import config from 'config';
import Debug from 'debug';
const debug = Debug('api:lib/auth');

import passport from 'passport';
import { Strategy as localStrategy } from 'passport-local';
import { UserModel } from '../schema/mongoModel';

passport.use('signin', new localStrategy({
	usernameField: 'id',
	passwordField: 'password'
},
async (id, password, done) => {
	try {
		const user = await UserModel.findOne({ $or: [{ email: id }, { username: id }] });

		if (!user) return done(null, false, { message: 'User not found' });

		const validate = await user.checkPassword(password);

		if (!validate) return done(null, false, { message: 'Wrong Password' });

		return done(null, user, { message: 'Logged in Successfully' });
	} catch (e) {
		debug(e);
		return done(e);
	}
}));
