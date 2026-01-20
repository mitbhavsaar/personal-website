const { google } = require('googleapis');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

// Ensure credentials are set
const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;
const CLIENT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'); // Handle newlines in env var

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: CLIENT_EMAIL,
    private_key: PRIVATE_KEY,
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });

/**
 * Appends a new row to the Google Sheet.
 * @param {Object} data - The data directly from the form: { name, email, message }
 */
const appendToSheet = async (data) => {
  if (!SPREADSHEET_ID || !CLIENT_EMAIL || !PRIVATE_KEY) {
    console.warn('Google Sheets credentials missing. Skipping Sheet update.');
    return;
  }

  try {
    const { name, email, message } = data;
    const date = new Date().toISOString();

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Sheet1!A:D', // Assuming columns: Name, Email, Message, Date
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: [[name, email, message, date]],
      },
    });

    console.log('Successfully added to Google Sheet');
  } catch (error) {
    console.error('Error adding to Google Sheet:', error.message);
    // Do not throw, so we don't block the main response if sheets fails
  }
};

module.exports = { appendToSheet };
