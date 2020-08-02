const express = require('express');
const accountRoute = require('./account.route');
const userRoute = require('./user.route');
//const fileSystemRoute = require('./filesystem.route');

const router = express.Router();

router.use('/accounts', accountRoute);
router.use('/users', userRoute);
//router.use('/filesystem', fileSystemRoute);

module.exports = router;