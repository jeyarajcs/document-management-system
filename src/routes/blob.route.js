const express = require('express');
const blobController = require('../controllers/blob.controller');
const {verifyToken} = require('../middlewares/tokenVerification');

const router = express.Router();

router.post('/create', verifyToken, blobController.createBlob);
router.post('/listBlobs', verifyToken, blobController.listBlobs);
router.post('/moveBlob', verifyToken, blobController.moveBlob);


module.exports = router;