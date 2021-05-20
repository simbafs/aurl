const router = require('express').Router();
const {RecordModule} = require('../../schema/record.js');

// verify url
function verifyUrl(req, res, next){
	var prasedUrl = require('url').parse(req.body.url);
	if( prasedUrl.host &&
		prasedUrl.hostname &&
		prasedUrl.pathname && 
		prasedUrl.protocol &&
		prasedUrl.slashes ){
		next();
	}
	else{
		return res.status(400).send({
			error: 'invalid url'
		});
	}
};

router.get('/', (req, res, next) => {
	res.send({
		'/': {
			description: 'index',
			params: []
		},
		'/code': {
			description: 'get record by code',
			params: ['code']
		},
		'/url': {
			description: 'get record by url',
			params: ['url']
		}
		
	})
});

router.get('/code', async (req, res, next) => {
	const code = req.body.code;
	if(!code) return res.status(400).send({error: 'code missed'});

	const result = await RecordModule.findOne({code: code});
	if(!result) return res.status(400).send({error: 'not found'});

	res.send({
		code: result.code,
		url: result.url,
		data: result.date
	});
});

router.get('/url', verifyUrl, async (req, res, next) => {
	const url = req.body.url;
	if(!url) return res.status(400).send({error: 'url missed'});

	const result = await RecordModule.findOne({url: url});
	if(!result) return res.status(400).send({error: 'not found'});

	res.send({
		code: result.code,
		url: result.url,
		data: result.date
	});
});

module.exports = router;
