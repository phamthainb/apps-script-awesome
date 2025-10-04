const TELEGRAM_TOKEN = 'YOUR_TELEGRAM_BOT_TOKEN';
const TELEGRAM_CHAT_ID = 'YOUR_CHAT_ID';

function mainCheckWebsites() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Websites');
  const data = sheet.getDataRange().getValues();
  
  // Collect URLs to check and their row indices
  const urlsToCheck = [];
  const rowIndices = [];
  
  for (let i = 1; i < data.length; i++) { // skip header row
    const url = data[i][0];
    const status = data[i][2]; // Status column (Enable/Disable)
    
    if (!url) continue;
    
    // Only check URL if status is Enable
    if (status && status.toString().toLowerCase() !== 'enable') {
      continue;
    }
    
    urlsToCheck.push(url);
    rowIndices.push(i);
  }
  
  // If no URLs to check, return early
  if (urlsToCheck.length === 0) {
    console.log('No enabled URLs to check');
    return;
  }
  
  // Prepare requests for parallel fetching
  const requests = urlsToCheck.map(url => ({
    url: url,
    muteHttpExceptions: true
  }));
  
  // Fetch all URLs in parallel
  let responses;
  try {
    responses = UrlFetchApp.fetchAll(requests);
  } catch (e) {
    console.error('Error fetching URLs: ' + e.message);
    return;
  }
  
  // Process responses and update sheet
  const now = new Date();
  const updates = [];
  
  for (let i = 0; i < responses.length; i++) {
    const url = urlsToCheck[i];
    const rowIndex = rowIndices[i];
    let statusCode;
    
    try {
      statusCode = responses[i].getResponseCode();
    } catch (e) {
      statusCode = 'DOWN';
    }
    
    // Prepare batch update for sheet
    updates.push({
      row: rowIndex + 1,
      statusCode: statusCode,
      time: now
    });
    
    // If site is down, send Telegram alert
    if (statusCode !== 200) {
      const message = `🚨 Website DOWN\nURL: ${url}\nStatus: ${statusCode}`;
      sendTelegram(message);
    }
  }
  
  // Batch update the sheet for better performance
  updates.forEach(update => {
    sheet.getRange(update.row, 4).setValue(update.statusCode); // LastStatus
    sheet.getRange(update.row, 5).setValue(update.time); // LastCheck
  });
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
      ['https://example.com', 'Sample Website', 'Enable', '', ''],
      ['https://google.com', 'Google Homepage', 'Enable', '', '']
    ];
    sheet.getRange(2, 1, sampleData.length, sampleData[0].length).setValues(sampleData);
    console.log('Added sample data to the sheet');
  }
  
  console.log('Sheet setup completed successfully!');
}
