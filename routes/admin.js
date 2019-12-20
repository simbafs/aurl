const router = require('express').Router();
const auth = require('./auth.js');
const {RecordModule} = require('../schema/record.js');
const ip = (req) => (req.headers['x-forwarded-for'] || req.connection.remoteAddress).replace('::ffff:', '');
require('dotenv').config();

router.get('/', async (req, res, next) => {
	// check if cookie is admin
	if(req.cookies.admin !== process.env.admin) return next();

	// console.log('ip', req.headers['x-forwarded-for'] || req.connection.remoteAddress);
	await RecordModule.find({}, (err, data) => {
		var records = [];
		data.forEach((item)=>{
			records.push({
				code: item.code,
				url: item.url,
				date: item.date,
				ip: item.ip || 'none'
			});
		});
		res.render('admin', {
			title: 'URL shortener',
			records: records,
			ip: ip(req)
		});
	});
});

module.exports = router;
