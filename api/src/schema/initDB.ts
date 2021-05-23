import { UserModel } from './mongoModel';
import config from 'config';
import Debug from 'debug';
const debug = Debug('api:schema/initDB');

debug(UserModel);

// create root
UserModel.findOne({ username: 'root' })
.then((data: unknown) => {
	if(!data) {
		debug('create user root');
		UserModel.create({
			email: config.get('admin.email'),
			username: 'root',
			password: config.get('admin.password'),
			permission: [ 'admin' ]
		})
	}
}, debug);

// create guest
UserModel.findOne({ username: 'guest' })
.then((data: unknown) => {
	if(!data) {
		debug('create user guest');
		UserModel.create({
			email: 'none',
			username: 'guest',
			password: 'guest',
			permission: [  ]
		})
	}
}, debug);
