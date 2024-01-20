const uploadHelper = require("../utils/uploadHelper.util.js");

class Upload {
  async uploadFile(req, res, next) {
    try {
      res.json(
        await uploadHelper.uploadFileToDrive(req.file_path, req.field_id)
      );
    } catch (err) {
      console.error(`upload failed! `, err.message);
      next(err);
    }
  }
}

module.exports = new Upload();
