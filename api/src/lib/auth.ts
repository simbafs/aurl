import config from 'config';

import Debug from 'debug';
const debug = Debug('api:lib/auth');

import passport from 'passport';
import { Request, Response, NextFunction } from 'express';

export const auth = () => passport.authenticate('jwt', { session: false });

export const isUserPermited = (requiredPermission: string[], userPermission: string[]) => {
	return requiredPermission.every(i => userPermission.includes(i));
}

export const check = (permission: string[]) =>
	(req: Request, res: Response, next: NextFunction) => {

	if(!req.user) return res.status(400).json('please login');
	const userPermission = req.user.permission;

	if(isUserPermited(permission, req.user.permission)) return next();
	else return res.status(403).json('permission denied');
}
