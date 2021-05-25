import { IUser } from '../types/custom.d';
import { Document } from 'mongoose';

export function pick(user: IUser & Document){
	return {
		username: user.username,
		permission: user.permission,
		verified: user.verified,
		_id: user._id
	};
}
