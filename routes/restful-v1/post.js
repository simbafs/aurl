const config = require('config');

const router = require('express').Router();
const base58 = require('base-58');
const crypto = require('crypto');
const {RecordModule} = require('../../schema/record.js');

// functions
//// get qrcode
const getQrcode = async (code) => {
	var qrcode;
	await Qrcode.toDataURL(`${config.get('app.BASEURL')}/${code}`)
		.then((url) => qrcode = url);
	return qrcode;
}

//// get random code
const getCode = () => base58.encode(crypto.randomBytes(4));

//// get ip
const ip = (req) => (req.headers['x-forwarded-for'] || req.connection.remoteAddress).replace('::ffff:', '');

//// verify url
function verifyUrl(url){
	if(!url) return false;
	var prasedUrl = require('url').parse(url);
	if( prasedUrl.host &&
		prasedUrl.hostname &&
		prasedUrl.pathname && 
		prasedUrl.protocol &&
		prasedUrl.slashes ){
		return true;
	}
	return false;
};

router.post('/', (req, res, next) => {
	res.send({
		'/': {
			description: 'index',
			params: []
		},
		'/create': {
			description: 'create a new record',
			params: ['url']
		}
	})
});

router.post('/create', async (req, res, next) => {
	var code = getCode();
	var url = req.body.url;

	if(!verifyUrl(url)) return res.status(400).send({
		error: 'invalid url'
	});

	// exclude ckcsc.net
	if(url.match(config.get('app.BASEURL'))){
		return res.status(400).send({
			error: `url can\'t contain ${config.get('app.BASEURL')}`
		});
	}

	// check if url is exist
	const record = await RecordModule.findOne({url: url});
	if(record) return res.send({
		surl: `${config.get('app.BASEURL')}/${record.code}`,
		url: record.url,
		code: record.code,
		date: record.date
	})
	
	// save record
	const recode = new RecordModule({
		code: code,
		url: url,
		ip: ip(req)
	});

	await recode.save()
		.then(() => res.send({
			surl: `${config.get('app.BASEURL')}/${code}`,
			url: record.url,
			code: record.code,
			date: record.date
		}))
		.catch((e) => res.status(400).send(e));
});

module.exports = router;
