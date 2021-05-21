import mongoose from 'mongoose';
const Schema = mongoose.Schema;

import Debug from 'debug';
const debug = Debug('api:schema/mongoModel');

import bcrypt from 'bcrypt';
import config from 'config';

const requiredString = {
	type: String,
	required: true
};
const ref = (ref:string) => ({ type: Schema.Types.ObjectId, ref: ref });

const UrlSchema = new Schema({
	url: requiredString,
	code: requiredString,
	owner: ref('User'),
	click: {
		type: Number,
		default: 0
	}
});

interface IUser {
	id: number,
	email: string,
	username: string,
	password: string,
	permission: string[]
}

const UserSchema = new Schema({
	id: {
		type: Number,
		require: true,
		unique: true
	},
	email: requiredString,
	username: requiredString,
	password: requiredString,
	permission: [ String ]
});

UserSchema.pre<IUser>('save', function(next){
	let self = this;
	bcrypt.hash(self.password, config.get('saltRound'))
	.then(password => { 
		this.password = password;
		next();
	});
});

const LogSchema = new Schema({
	type: requiredString,
	message: requiredString,
	data: String,
	date: {
		type: Date,
		default: Date.now
	}
});

export const UrlModel = mongoose.model('Url', UrlSchema);
export const UserModel = mongoose.model('User', UserSchema);
export const LogModel = mongoose.model('Click', LogSchema);
