import config from 'config';

import Debug from 'debug';
const debug = Debug('api:lib/auth');

import passport from 'passport';
import { Request, Response, NextFunction } from 'express';
import { isContain, typeOfElement } from '../lib/util';

export const auth = () => passport.authenticate('jwt', { session: false });

export const isUserPermited = (requiredPermission: (string | string[])[]) => (userPermission: string[]) => {
	let types = typeOfElement(requiredPermission);
	if(types.length === 1){
		if(types[0] === 'array'){
			let isDoubleStringArray = (requiredPermission as any[]).every(i => {
				let types = typeOfElement(i);
				return types.length === 1 && types[0] === 'string';
			})
			if(isDoubleStringArray){
				debug('string[][]');
				if(requiredPermission.some(i => isContain(userPermission, i as string[]))) return true;
			}
		}else if(types[0] === 'string'){
			debug('string[]');
			if(isContain(userPermission, requiredPermission as string[])) return true
		}
	}
	return false;
	
}

export const check = (permission: (string | string[])[]) =>
	(req: Request, res: Response, next: NextFunction) => {

	if(!req.user) return res.status(400).json('please login');
	const userPermission = req.user.permission;

	if(isUserPermited(permission)(req.user.permission)) return next();
	else return res.status(403).json('permission denied');
}



