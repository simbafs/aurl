const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const requiredString = {
	type: String,
	required: true
};
const ref = (ref:string) => ({ type: Schema.Types.ObjectId, ref: ref });

const UrlSchema = new Schema({
	url: requiredString,
	code: {
		...requiredString,
		unique: true
	},
	owner: ref('User'),
	click: {
		type: Number,
		default: 0
	}
});

const UserSchema = new Schema({
	id: {
		type: Number,
		require: true,
		unique: true
	},
	email: requiredString,
	username: requiredString,
	permission: [ String ]
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
