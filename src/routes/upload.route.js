const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/upload.controller.js');

// Define routes related to uploading
router.get('/start-upload', uploadController.startUpload);
router.get('/upload-progress', uploadController.getUploadProgress);

module.exports = router;
