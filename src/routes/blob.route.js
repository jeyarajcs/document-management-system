const express = require('express');
const blobController = require('../controllers/blob.controller');

const router = express.Router();

router.post('/create', blobController.createBlob);
router.post('/listBlobs', blobController.listBlobs);
router.post('/moveBlob', blobController.moveBlob);


module.exports = router;