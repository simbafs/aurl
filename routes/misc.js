const ip = (req) => (req.headers['x-forwarded-for'] || req.connection.remoteAddress).replace('::ffff:', '');
const {RecordModule} = require('../schema/record.js');
const Qrcode = require('qrcode');
const base58 = require('base-58');
const crypto = require('crypto');

// functions
// get qrcode
const getQrcode = async (code) => {
	var qrcode;
	await Qrcode.toDataURL(`${process.env.BASEURL}/${code}`)
		.then((url) => qrcode = url);
	return qrcode;
}

//// get random code
const getCode = () => base58.encode(crypto.randomBytes(4));

//// verify url
const isUrl = (url) => {
	var prasedUrl = require('url').parse(url.toString());
	// console.log(url);
	// console.log(prasedUrl);
	if( prasedUrl.host &&
		prasedUrl.hostname &&
		prasedUrl.pathname &&
		prasedUrl.protocol &&
		prasedUrl.slashes ){
		return true;
	}
	return false;
};

module.exports = {
	RecordModule: RecordModule,
	ip: ip,
	getQrcode: getQrcode,
	getCode: getCode,
	isUrl: isUrl
}
