const router = require('express').Router();
const {RecordModule} = require('../schema/record.js');
require('dotenv').config();

router.get('/', async (req, res, next) => {
	// check if cookie is admin
	if(req.cookies.admin !== process.env.admin) return next();

	console.log('ip', req.headers['x-forwarded-for'] || req.connection.remoteAddress);
	var records = [];
	await RecordModule.find({}, (err, data) => {
		data.forEach((item)=>{
			records.push({
				code: item.code,
				url: item.url,
				date: item.date,
				ip: item.ip || 'none'
			});
		});
	});
	res.send(records);
});

module.exports = router;
