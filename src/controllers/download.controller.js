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





