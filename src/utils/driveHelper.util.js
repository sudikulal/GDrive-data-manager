const { google } = require("googleapis");
const { OAuth2 } = require("google-auth-library");

class DriveHelper {
  async getDriveDetails() {
    const credentials = require("./path-to-your-credentials.json");

    const oauth2Client = new OAuth2(
      credentials.client_id,
      credentials.client_secret,
      credentials.redirect_uris[0]
    );

    oauth2Client.setCredentials(credentials);

    return google.drive({ version: "v3", auth: oauth2Client });
  }
}

module.exports = new DriveHelper();
