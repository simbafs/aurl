import { UserModel, CodeModel } from './mongoModel';
import config from 'config';
import Debug from 'debug';
const debug = Debug('api:schema/initDB');

// create root
UserModel.findOne({ username: 'root' })
.then((data: unknown) => {
	if(!data) {
		debug('create user root');
		UserModel.create({
			email: config.get('root.email'),
			username: 'root',
			password: config.get('root.password'),
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
			email: config.get('guest.email'),
			username: config.get('guest.username'),
			password: config.get('guest.password'),
			permission: config.get('guest.permission')
		})
	}
}, debug);

// create default scope
CodeModel.findOne({ scope: 'default' })
.then((data: unknown) => {
	if(!data) {
		debug('create default scope');
		CodeModel.create({
			scope: 'default',
			codes: []
		});
	}
})
