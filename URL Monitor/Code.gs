const TELEGRAM_TOKEN = 'YOUR_TELEGRAM_BOT_TOKEN';
const TELEGRAM_CHAT_ID = 'YOUR_CHAT_ID';

function mainCheckWebsites() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Websites');
  const data = sheet.getDataRange().getValues();

  for (let i = 1; i < data.length; i++) { // skip header row
    const url = data[i][0];
    const status = data[i][2]; // Status column (Active/Inactive)
    
    if (!url) continue;
    
    // Only check URL if status is Active
    if (status && status.toString().toLowerCase() !== 'active') {
      continue;
    }

    let statusCode, message;
    try {
      const response = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
      statusCode = response.getResponseCode();
    } catch (e) {
      statusCode = 'DOWN';
    }

    // Update the sheet
    sheet.getRange(i + 1, 4).setValue(statusCode); // LastStatus
    sheet.getRange(i + 1, 5).setValue(new Date()); // LastCheck

    // If site is down, send Telegram alert
    if (statusCode !== 200) {
      message = `🚨 Website DOWN\nURL: ${url}\nStatus: ${statusCode}`;
      sendTelegram(message);
    }
  }
}

function sendTelegram(text) {
  const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;
  const payload = {
    chat_id: TELEGRAM_CHAT_ID,
    text: text,
    parse_mode: 'Markdown'
  };
  UrlFetchApp.fetch(url, {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(payload)
  });
}

/**
 * Setup function to create the Websites sheet with proper headers
 * Run this function once to initialize your spreadsheet
 */
function setupSheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  
  // Check if 'Websites' sheet already exists
  let sheet = spreadsheet.getSheetByName('Websites');
  
  if (!sheet) {
    // Create the sheet if it doesn't exist
    sheet = spreadsheet.insertSheet('Websites');
    console.log('Created new "Websites" sheet');
  } else {
    console.log('Found existing "Websites" sheet');
  }
  
  // Set up headers
  const headers = ['URL', 'Note', 'Status', 'LastStatus', 'LastCheck'];
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  
  // Format headers
  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setFontWeight('bold');
  headerRange.setBackground('#f0f0f0');
  
  // Set column widths for better readability
  sheet.setColumnWidth(1, 300); // URL column
  sheet.setColumnWidth(2, 150); // Note column
  sheet.setColumnWidth(3, 80);  // Status column
  sheet.setColumnWidth(4, 100); // LastStatus column
  sheet.setColumnWidth(5, 180); // LastCheck column
  
  // Add sample data if the sheet is newly created
  if (sheet.getLastRow() === 1) {
    const sampleData = [
      ['https://example.com', 'Sample Website', 'Active', '', ''],
      ['https://google.com', 'Google Homepage', 'Active', '', '']
    ];
    sheet.getRange(2, 1, sampleData.length, sampleData[0].length).setValues(sampleData);
    console.log('Added sample data to the sheet');
  }
  
  console.log('Sheet setup completed successfully!');
}
