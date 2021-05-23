import { Schema, model, Document, Model } from 'mongoose';

import Debug from 'debug';
const debug = Debug('api:schema/mongoModel');

import bcrypt from 'bcrypt';
import config from 'config';
import { v4 as uuid } from 'uuid';

const requiredString = {
	type: String,
	required: true
};
const ref = (ref:string) => ({ type: Schema.Types.ObjectId, ref: ref });

interface IUrl {
	url: string,
	code: string,
	owner: typeof Schema.Types.ObjectId,
	click: number
}

const UrlSchema = new Schema<IUrl>({
	url: requiredString,
	code: requiredString,
	owner: ref('User'),
	click: {
		type: Number,
		default: 0
	}
});

interface IUser {
	email: string,
	username: string,
	password: string,
	permission: string[],
	verifyCode: string,
	verified: boolean
}

const UserSchema = new Schema<IUser>({
	email: requiredString,
	username: requiredString,
	password: requiredString,
	permission: {
		type: [String],
		default: [ 'user' ]
	},
	verifyCode: {
		type: String,
		default: uuid
	},
	verified: {
		type: Boolean,
		default: false
	}
});

UserSchema.pre('save', function(next){
	let self = this;
	bcrypt.hash(self.password, config.get('saltRound'))
	.then(password => {
		this.password = password;
		next();
	});
});

UserSchema.methods.checkPassword = async function(password) {
	const user = this;
	return await bcrypt.compare(password, user.password);
}

interface ILog {
	type: string,
	message: string,
	data: string,
	date: typeof Date
}

const LogSchema = new Schema<ILog>({
	type: requiredString,
	message: requiredString,
	data: String,
	date: {
		type: Date,
		default: Date.now
	}
});

export const UrlModel = model('Url', UrlSchema);
export const UserModel = model('User', UserSchema);
export const LogModel = model('Click', LogSchema);
