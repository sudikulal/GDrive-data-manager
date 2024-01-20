const fs = require("fs");
const driveHelper = require('./driveHelper.util')

class UploadHelper {
  async uploadFileToDrive(filePath, destinationFolderId) {
    const chunkSize = 1024 * 1024; 

    const fileSize = fs.statSync(filePath).size;

    const fileStream = fs.createReadStream(filePath);

    for (let i = 0; i < Math.ceil(fileSize / chunkSize); i++) {
      const startByte = i * chunkSize;
      const endByte = Math.min((i + 1) * chunkSize, fileSize);

      const headers = {
        "Content-Length": endByte - startByte,
      };

      await drive.files.create({
        requestBody: {
          name: "Uploaded_Video.mp4",
          parents: [destinationFolderId],
        },
        media: {
          body: fileStream.slice(startByte, endByte),
        },
        headers,
      });
      const progress = ((i + 1) / Math.ceil(fileSize / chunkSize)) * 100;
      console.log(`Upload Progress: ${progress.toFixed(2)}%`);
    }
  }
}

module.exports = new UploadHelper()