const { google } = require("googleapis");
const { OAuth2 } = require("google-auth-library");

class DriveHelper {
  async getDriveDetails() {
    // Load the credentials from the JSON file
    const credentials = require("./path-to-your-credentials.json");

    // Create a new OAuth2 client
    const oauth2Client = new OAuth2(
      credentials.client_id,
      credentials.client_secret,
      credentials.redirect_uris[0]
    );

    // Set the credentials and authenticate
    oauth2Client.setCredentials(credentials);

    // You're now authenticated and can make requests to the Google Drive API
    const drive = await google.drive({ version: "v3", auth: oauth2Client });

    return drive;
  }
}

module.exports = new DriveHelper();
