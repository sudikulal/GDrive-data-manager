const downloadHelper = require('../utils/downloadHelper.util.js')

class Download {

  async downloadFile(req,res,next){
    try {
      res.json(await downloadHelper.downloadDriveFile(req.field_id,req.file_path));
    } catch (err) {
      console.error(`download failed! `, err.message);
      next(err);
    }
  }
}

module.exports = new Download()
const express = require('express');
const fs = require('fs');
const axios = require('axios');
const { google } = require('googleapis');
const { OAuth2 } = require('google-auth-library');

const app = express();
const port = 3000;

// Set up Google Drive API and OAuth2 client
const drive = google.drive({
  version: 'v3',
  auth: new OAuth2(
    'YOUR_CLIENT_ID',     // Replace with your OAuth client ID
    'YOUR_CLIENT_SECRET' // Replace with your OAuth client secret
  ),
});

// Function to download a file with progress tracking
async function downloadFileWithProgress(fileId, chunkSize, filePath, onProgress) {
  const fileInfo = await drive.files.get({ fileId, fields: 'size' });
  const fileSize = fileInfo.data.size;
  const fileStream = fs.createWriteStream(filePath);

  let downloadedBytes = 0;

  const response = await axios.get(`https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`, {
    responseType: 'stream',
  });

  response.data.on('data', (chunk) => {
    downloadedBytes += chunk.length;
    const progress = (downloadedBytes / fileSize) * 100;
    onProgress(progress);
  });

  response.data.pipe(fileStream);

  return new Promise((resolve, reject) => {
    fileStream.on('finish', resolve);
    fileStream.on('error', reject);
  });
}

// Endpoint to initiate the download
app.get('/download', async (req, res) => {
  const sourceFileId = 'YOUR_SOURCE_FILE_ID'; // Replace with the Google Drive file ID of the source video
  const chunkSize = 1024 * 1024; // 1 MB chunks

  res.send('Download started...');

  // Download and track download progress
  await downloadFileWithProgress(sourceFileId, chunkSize, 'downloaded_video.mp4', (progress) => {
    console.log(`Download Progress: ${progress.toFixed(2)}%`);
  });

  console.log('Download completed.');
});

// Endpoint to check the download progress
app.get('/download-progress', (req, res) => {
  // Implement logic to retrieve and send the download progress
  // This logic depends on how you're tracking progress in your application
  // You can use global variables or other mechanisms to store and retrieve progress.

  const downloadProgress = 0; // Replace with your actual progress value

  res.json({ progress: downloadProgress });
});
