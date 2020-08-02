const express = require('express');
const authController = require('../controllers/user.controller');

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
// router.post('/refresh-tokens', validate(authValidation.refreshTokens), authController.refreshTokens);
// router.post('/forgot-password', validate(authValidation.forgotPassword), authController.forgotPassword);
// router.post('/reset-password', validate(authValidation.resetPassword), authController.resetPassword);

module.exports = router;