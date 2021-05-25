import Debug from 'debug';
const debug = Debug('api:test');

import config from 'config';

import { randomCode } from './lib/code';

import mongoose from 'mongoose';

import { UserModel } from './schema/mongoModel';
(async () => {
	mongoose.connect('mongodb://127.0.0.1:27017', {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false
	}, (err) => {
		if(err) return console.error(err);
	});
	debug({ code: await randomCode() });

	// debug(await UserModel.findOneAndUpdate({ username: 'simbasdfa' }, { verified: false }));
})()

// import render from './lib/sendEmail';
// render({
//     username: 'simba',
//     email: 'simba.fs@gmail.com',
//     verifyUrl: 'http://localhost:3000/user/signup/verify/23819-21312-3123-123'
// });
