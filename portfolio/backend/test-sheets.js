const { google } = require('googleapis');
require('dotenv').config();

async function testSheets() {
    const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;
    const CLIENT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');

    console.log('ID:', SPREADSHEET_ID);
    console.log('Email:', CLIENT_EMAIL);
    console.log('Key exists:', !!PRIVATE_KEY);
    if (PRIVATE_KEY) {
        console.log('Key starts with:', PRIVATE_KEY.substring(0, 50));
        console.log('Key contains actual newlines:', PRIVATE_KEY.includes('\n'));
    }

    if (!SPREADSHEET_ID || !CLIENT_EMAIL || !PRIVATE_KEY) {
        console.error('Missing credentials');
        return;
    }

    const auth = new google.auth.GoogleAuth({
        credentials: {
            client_email: CLIENT_EMAIL,
            private_key: PRIVATE_KEY,
        },
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    try {
        const res = await sheets.spreadsheets.get({
            spreadsheetId: SPREADSHEET_ID,
        });
        console.log('Connection successful! Sheet title:', res.data.properties.title);

        // Try to append a test row
        const testData = {
            name: 'Test Name',
            email: 'test@example.com',
            message: 'Test Message at ' + new Date().toISOString()
        };

        await sheets.spreadsheets.values.append({
            spreadsheetId: SPREADSHEET_ID,
            range: 'Sheet1!A:D',
            valueInputOption: 'USER_ENTERED',
            resource: {
                values: [[testData.name, testData.email, testData.message, new Date().toISOString()]],
            },
        });
        console.log('Append successful!');
    } catch (error) {
        console.error('Error:', error.message);
        if (error.response) {
            console.error('Details:', error.response.data);
        }
    }
}

testSheets();
