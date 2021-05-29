import Debug from 'debug';
const debug = Debug('api:schema/mongoModel');

import bcrypt from 'bcrypt';
import config from 'config';
import { v4 as uuid } from 'uuid';
import { Schema, model, Document, Model } from 'mongoose';
import { IUrl, IUser, ILog, ICode } from '../types/custom.d';
import { randomCode } from '../lib/code';

let saltRound = config.get('saltRound') as number;

const requiredString = {
	type: String,
	required: true
};
const ref = (ref:string) => ({ type: Schema.Types.ObjectId, ref: ref });

const UrlSchema = new Schema<IUrl>({
	url: requiredString,
	code: requiredString,
	owner: ref('User'),
	click: {
		type: Number,
		default: 0
	},
	state: {
		type: String,
		default: 'unsafe'
	},
	secret: String,
	delete: {
		type: Boolean,
		default: false
	}
});

UrlSchema.pre('save', async function(){
	if(!this.secert) bcrypt.hash(await randomCode(), saltRound)
		.then(secret => this.secret = secret);
})

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
	},
	delete: {
		type: Boolean,
		default: false
	}
});

UserSchema.methods.checkPassword = async function(password) {
	const user = this;
	return await bcrypt.compare(password, user.password);
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

// store all codes
const CodeSchema = new Schema<ICode>({
	scope: requiredString,
	code: [String]
})

export const UrlModel = model('Url', UrlSchema);
export const UserModel = model('User', UserSchema);
export const LogModel = model('Click', LogSchema);
export const CodeModel = model('Code', CodeSchema);
