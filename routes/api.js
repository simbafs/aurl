const router = require('express').Router();

// include route
const getRoute = require('./restful-v1/get.js');
const postRoute = require('./restful-v1/post.js');

router.use(getRoute);
router.use(postRoute);

module.exports = router;
