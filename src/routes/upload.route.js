const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/upload.controller.js');

router.get('/start-upload', uploadController.uploadFile);
// router.get('/upload-progress', uploadController.getUploadProgress);

module.exports = router;
