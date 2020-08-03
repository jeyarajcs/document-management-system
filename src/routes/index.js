const express = require('express');
const accountRoute = require('./account.route');
const userRoute = require('./user.route');
const blobRoute = require('./blob.route');

const router = express.Router();

router.use('/accounts', accountRoute);
router.use('/users', userRoute);
router.use('/blob', blobRoute);

module.exports = router;