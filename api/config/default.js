const fs = require('fs');
const path = require('path');

const templatePath = path.join(__dirname, 'default-email-template.ejs');
module.exports = {
	port: 3000,
	baseUrl: 'http://localhost:3000',
	DB: 'mongodb://127.0.0.1:27017',
	root: {
		email: 'admin@aurl.simba-fs.dev',
		password: 'aurl'
	},
	guest: {
		username: 'guest',
		password: 'guest',	// this value does not matter. It is only used to satisfy the DB schema
		email: 'none',		// this value does not matter, either
		permission: []		// this value is important, it defines the default permissions for all user in this website
	},
	saltRound: 10,
	mail: {
		template: fs.readFileSync(templatePath).toString(),
		subject: 'Verify Your Email',
		host: 'example.com',
		port: 465,
		user: 'noreply@example.com',
		username: 'noreply<noreply@example.com>',
		password: 'password'
	},
	jwt: {
		secret: 'autljwtsecret'
	}
}
