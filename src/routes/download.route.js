const express = require('express');
const router = express.Router();
const downloadController = require('../controllers/download.controller.js');

// Define routes related to downloading
router.get('/start-download', downloadController.startDownload);
router.get('/download-progress', downloadController.getDownloadProgress);

module.exports = router;
