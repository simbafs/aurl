const fs = require('fs');
const path = require('path');

const templatePath = path.join(__dirname, 'default-email-template.ejs');
module.exports = {
	port: 3000,
	DB: 'mongodb://127.0.0.1:27017',
	admin: {
		email: 'admin@aurl.simba-fs.dev',
		password: 'aurl'
	},
	saltRound: 10,
	app: {
		baseUrl: 'http://localhost:3000'
	},
	mail: {
		template: fs.readFileSync(templatePath).toString(),
		subject: 'Verify Your Email'
	}
}
