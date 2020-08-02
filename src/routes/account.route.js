const express = require('express');
const accountController = require('../controllers/account.controller');

const router = express.Router();

router.post('/account', accountController.createAccount);

module.exports = router;