import config from 'config';
import Debug from 'debug';
const debug = Debug('api:lib/jwt');

import jwt from 'jsonwebtoken';

export default function sign(payload: any){
	return jwt.sign({
		...payload,
		iat: Date.now()
	}, config.get('jwt.secret'));
}
