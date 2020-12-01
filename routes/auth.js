(async ()=>{
	const crypto = require('crypto');
	await require('./misc.js');
	const {getCode} = require('./misc.js');
	require('dotenv').config();
	
	// user pool
	var users = [];
	
	function token(ip){
		if(!(/\b(?:\d{1,3}\.){3}\d{1,3}\b/.test(ip))) return false;
		if(users.some((item) => item.ip === ip)) return users.find((item) => item.ip === ip).token;
		var token = getCode();
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
		verify: verify,
		users: users
	}
})();
