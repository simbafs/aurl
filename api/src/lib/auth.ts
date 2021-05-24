import config from 'config';

import Debug from 'debug';
const debug = Debug('api:lib/auth');

import passport from 'passport';
import { Request, Response, NextFunction } from 'express';
import { isContain, typeOfElement } from '../lib/util';

export const auth = () => passport.authenticate('jwt', { session: false });

export const check = (permission?: string[] | string[][]) => 
	(req: Request, res: Response, next: NextFunction) => {

		if(permission){
			if(!req.user) return res.status(400).json('please login');
			const userPermission = req.user.permission;
			debug({
				requiredPermission: permission,
				userPermission: userPermission
			});

			let types = typeOfElement(permission);
			debug({ types });
			// string[][]
			if(types.length === 1){

				if(types[0] === 'array'){
					let isDoubleStringArray = (permission as any[]).every(i => {
						let types = typeOfElement(i);
						return types.length === 1 && types[0] === 'string';
					})
					if(isDoubleStringArray){
						debug('string[][]');
						permission = permission as string[][];
						if(permission.some(i => isContain(userPermission, i))) return next();
					}
				}else if(types[0] === 'string'){
					debug('string[]');
					permission = permission as string[];
					if(isContain(userPermission, permission)) return next();
				}
			}
		}

		return res.status(403).json('permission denied');
	}



