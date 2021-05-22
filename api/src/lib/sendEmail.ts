import config from 'config';
import ejs from 'ejs';
import nodemailer from 'nodemailer';

import Debug from 'debug';
const debug = Debug('api:lib/sendEmail');

type data = {
	username?: string,
	email?: string,
	verifyUrl?: string
}

debug('transporter', {
	host: config.get('mail.host'),
	secure: true,
	port: config.get('mail.port'),
	auth: {
		user: config.get('mail.user'),
		pass: config.get('mail.password'),
	}
});

const transporter = nodemailer.createTransport({
	host: config.get('mail.host'),
	secure: true,
	port: config.get('mail.port'),
	auth: {
		user: config.get('mail.user'),
		pass: config.get('mail.password'),
	}
});

// debug(`"${config.get('mail.user')}"<${config.get('mail.user')}@${config.get('mail.host')}>`);
export default async function sendEmail(data: data, template: string = config.get('mail.template')){
	let html = ejs.render(template, data);
	debug('sendMail', {
		from: config.get('mail.username'),
		to: data.email,
		subject: config.get('mail.subject'),
		html: html
	});
	let info;
	try {
		info = await transporter.sendMail({
			from: config.get('mail.username'),
			to: data.email,
			subject: config.get('mail.subject'),
			html: html
		})
	}catch(e){
		return e;
	}
	return info;
}
