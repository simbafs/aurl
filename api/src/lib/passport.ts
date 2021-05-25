import config from 'config';
import Debug from 'debug';
const debug = Debug('api:lib/auth');

import passport from 'passport';
import { Strategy as localStrategy } from 'passport-local';
import { UserModel } from '../schema/mongoModel';
import { Strategy as JWTstrategy, ExtractJwt } from 'passport-jwt';

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

passport.use(new JWTstrategy({
	secretOrKey: config.get('jwt.secret'),
	jwtFromRequest: ExtractJwt.fromBodyField('token')
},
async (token, done) => {
	debug({ token });
	try {
		return done(null, token.user);
	} catch (error) {
		return done(null, {});
		// done(error);
	}
}));

