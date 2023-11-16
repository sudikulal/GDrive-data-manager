const fs = require("fs");
const driveHelper = require('./driveHelper.util')

class UploadHelper {
      // Function to upload a file to Google Drive
  async uploadFileToDrive(filePath, destinationFolderId) {
    const chunkSize = 1024 * 1024; // 1 MB chunks

    const fileSize = fs.statSync(filePath).size;

    // Create a read stream for the local file
    const fileStream = fs.createReadStream(filePath);

    // Upload the file in chunks
    for (let i = 0; i < Math.ceil(fileSize / chunkSize); i++) {
      const startByte = i * chunkSize;
      const endByte = Math.min((i + 1) * chunkSize, fileSize);

      const headers = {
        "Content-Length": endByte - startByte,
      };

      await drive.files.create({
        requestBody: {
          name: "Uploaded Video.mp4", // Change to your desired file name
          parents: [destinationFolderId],
        },
        media: {
          body: fileStream.slice(startByte, endByte),
        },
        headers,
      });

      // You can update progress here if needed
      const progress = ((i + 1) / Math.ceil(fileSize / chunkSize)) * 100;
      console.log(`Upload Progress: ${progress.toFixed(2)}%`);
    }
  }
}

module.exports = new UploadHelper()