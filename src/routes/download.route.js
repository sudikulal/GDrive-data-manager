const express = require('express');
const router = express.Router();
const downloadController = require('../controllers/download.controller.js');

router.get('/start-download', downloadController.downloadFile);
// router.get('/download-progress', downloadController.getDownloadProgress);

module.exports = router;
