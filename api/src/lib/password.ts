import bcrypt from 'bcrypt';
import config from 'config';

export default function(password: string){
	return bcrypt.hash(password, config.get('saltRound'));
}
