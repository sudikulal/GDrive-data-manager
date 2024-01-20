const fs = require("fs");
const axios = require("axios");
const driveHelper = require('./driveHelper.util')

class DownloadHelper{
  async downloadDriveFile(fileId, filePath) {
    const chunkSize = 1024 * 1024; 

    const drive = await driveHelper.getDriveDetails();

    const fileSize = (await drive.files.get({ fileId, fields: "size" })).data
      .size;

    const fileStream = fs.createWriteStream(filePath);

    const numChunks = Math.ceil(fileSize / chunkSize);

    for (let i = 0; i < numChunks; i++) {
      const startByte = i * chunkSize;
      const endByte = Math.min((i + 1) * chunkSize - 1, fileSize - 1);

      const headers = {
        Range: `bytes=${startByte}-${endByte}`,
      };

      const response = await axios.get(
        `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`,
        {
          headers,
          responseType: "stream",
        }
      );

      response.data.pipe(fileStream);
      
      const progress = ((i + 1) / numChunks) * 100;
      console.log(`Download Progress: ${progress.toFixed(2)}%`);
    }

    return new Promise((resolve, reject) => {
      fileStream.on("finish", resolve);
      fileStream.on("error", reject);
    });
  }
}



module.exports = new DownloadHelper()