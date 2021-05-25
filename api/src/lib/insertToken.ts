import Debug from 'debug';
const debug = Debug('api:lib/insertToken');

import { Request, Response, NextFunction } from 'express';
import { UserModel } from '../schema/mongoModel';
import { IUser } from '../types/custom.d';
import sign from './jwt';

export default (username: string) => {
	return (req: Request, res: Response, next: NextFunction) => {
		if(!req.body.token){
			UserModel.findOne({ username }).then((user: IUser) => {
				let token = sign({
					user: {
						username: user.username,
						permission: user.permission,
						verified: user.verified
					}
				});
				debug(`auto generate token for ${username} '${token}'`);
				req.body.token = token;
				return next();
			});
		} else {
			return next();
		}
	}
}
