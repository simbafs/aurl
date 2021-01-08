const config = require('config');

const router = require('express').Router();
const {ip, RecordModule} = require('./misc.js');

// router
const viewRouter = require('./view.js');
const createRouter = require('./create.js');

// view
router.use('/view', viewRouter);

// policy
router.get('/policy', (req, res, next) => {
	res.render('policy');
});

// create a new record
router.use('/c', createRouter);

router.get('/:code', async (req, res, next) => {
	const code = req.params.code;

	// check if code is exist
	const record = await RecordModule.findOne({code: code});
	if(!record) return res.status(404).render('notFound', {
		baseUrl: config.get('app.BASEURL'),
		code: code
	});
	
	//redirect to url
	res.redirect(record.url);
});

/* GET home page. */
router.get('/', (req, res, next) => {
	res.render('index');
});


module.exports = router;
