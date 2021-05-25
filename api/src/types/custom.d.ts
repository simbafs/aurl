import { Schema, Document } from 'mongoose';

export interface IUrl {
	url: string,
	code: string,
	owner: typeof Schema.Types.ObjectId,
	click: number,
	state: string,
	secret: string
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

export interface ICode {
	scope: string,
	codes: string[]
}

declare global{
	namespace Express {
		// interface User extends IUser {}
		interface Request {
			user: IUser & Document
		}
	}
}
