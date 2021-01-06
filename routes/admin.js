const router = require('express').Router();
const moment = require('moment-timezone');
const {RecordModule, ip} = require('./misc.js');

router.get('/', async (req, res, next) => {
	// check permission
	if(req.cookies.admin !== config.get('app.admin')) return next();

	await RecordModule.find({}, (err, data) => {
		var records = [];
		data.forEach((item)=>{
			records.push({
				code: item.code,
				url: item.url,
				date: moment(item.date).locale('zh-tw').tz('Asia/Taipei').format('LLLL'),
				ip: item.ip || 'none'
			});
		});
		res.render('admin', {
			records: records
		});
	});
});

module.exports = router;
