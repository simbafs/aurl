const jwt = require('jsonwebtoken');
const crypto = require('crypto');
require('dotenv').config();

// user pool
var users = [];

const getCode = (n = 10) => crypto.randomBytes(n).toString('hex');

function token(ip){
	if(!(/\b(?:\d{1,3}\.){3}\d{1,3}\b/.test(ip))) return false;
	if(users.some((item) => item.ip === ip)) return users.find((item) => item.ip === ip).token;
	var token = jwt.sign({token: getCode()}, process.env.SCRETE, { expiresIn: '1h' });
	users.push({
		ip: ip,
		token: token
	});
	return token;
}

function verify(token){
	if(users.some((item) => item.token === token)){
		users = users.filter((item) => item.token !== token);
		return true;
	}
	return false;
}

module.exports = {
	token: token,
	verify: verify
}
