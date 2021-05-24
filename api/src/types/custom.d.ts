import { Schema } from 'mongoose';

export interface IUrl {
	url: string,
	code: string,
	owner: typeof Schema.Types.ObjectId,
	click: number
}

export interface IUser {
	email: string,
	username: string,
	password: string,
	permission: string[],
	verifyCode: string,
	verified: boolean
}

export interface ILog {
	type: string,
	message: string,
	data: string,
	date: typeof Date
}

declare global{
	namespace Express {
		interface User extends IUser {}
	}
}
