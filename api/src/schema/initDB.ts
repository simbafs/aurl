import { UserModel } from './mongoModel';
import config from 'config';
import Debug from 'debug';
const debug = Debug('api:schema/initDB');

debug(UserModel);

// create root
UserModel.findOne({ id: 0 })
.then((data: unknown) => {
	if(!data) {
		debug('create user root');
		UserModel.create({
			id: 0,
			email: config.get('admin.email'),
			username: 'root',
			password: config.get('admin.password'),
			permission: [ 'admin' ]
		})
	}
})

// create guest
UserModel.findOne({ id: 1 })
.then((data: unknown) => {
	if(!data) {
		debug('create user guest');
		UserModel.create({
			id: 1,
			email: 'none',
			username: 'guest',
			password: 'guest',
			permission: [  ]
		})
	}
})
