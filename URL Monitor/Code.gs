const TELEGRAM_TOKEN = 'YOUR_TELEGRAM_BOT_TOKEN';
const TELEGRAM_CHAT_ID = 'YOUR_CHAT_ID';

function mainCheckWebsites() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Websites');
  const data = sheet.getDataRange().getValues();
  
  // Collect URLs to check and their row indices
  const urlsToCheck = [];
  const rowIndices = [];
  const alertScripts = [];
  
  for (let i = 1; i < data.length; i++) { // skip header row
    const url = data[i][0];
    const status = data[i][2]; // Status column (Enable/Disable)
    const alertScript = data[i][5]; // AlertScript column (optional custom script)
    
    if (!url) continue;
    
    // Only check URL if status is Enable
    if (status && status.toString().toLowerCase() !== 'enable') {
      continue;
    }
    
    urlsToCheck.push(url);
    rowIndices.push(i);
    alertScripts.push(alertScript || '');
  }
  
  // If no URLs to check, return early
  if (urlsToCheck.length === 0) {
    console.log('No enabled URLs to check');
    return;
  }
  
  // Process URLs in batches to respect fetchAll limit of 50 requests
  const BATCH_SIZE = 50;
  const now = new Date();
  const updates = [];
  
  for (let batchStart = 0; batchStart < urlsToCheck.length; batchStart += BATCH_SIZE) {
    const batchEnd = Math.min(batchStart + BATCH_SIZE, urlsToCheck.length);
    const batchUrls = urlsToCheck.slice(batchStart, batchEnd);
    const batchIndices = rowIndices.slice(batchStart, batchEnd);
    
    // Prepare requests for this batch
    const requests = batchUrls.map(url => ({
      url: url,
      muteHttpExceptions: true
    }));
    
    // Fetch URLs in this batch in parallel
    let responses;
    try {
      responses = UrlFetchApp.fetchAll(requests);
    } catch (e) {
      console.error(`Error fetching batch ${batchStart}-${batchEnd}: ${e.message}`);
      continue; // Skip this batch and continue with the next
    }
    
    // Process responses for this batch
    for (let i = 0; i < responses.length; i++) {
      const url = batchUrls[i];
      const rowIndex = batchIndices[i];
      const alertScript = alertScripts[batchStart + i];
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
      
      // Determine if alert should be sent
      let shouldAlert = false;
      
      if (alertScript) {
        // Use custom alert script if provided
        shouldAlert = evaluateAlertScript(alertScript, responses[i], statusCode);
      } else {
        // Default behavior: alert if status code is not 200
        shouldAlert = (statusCode !== 200);
      }
      
      // Send Telegram alert if needed
      if (shouldAlert) {
        const message = `🚨 Website DOWN\nURL: ${url}\nStatus: ${statusCode}`;
        sendTelegram(message);
      }
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
 * Evaluates a custom alert script to determine if an alert should be sent
 * @param {string} script - The custom JavaScript function as a string
 * @param {HTTPResponse} response - The HTTP response object
 * @param {number|string} statusCode - The status code
 * @return {boolean} - True if alert should be sent, false otherwise
 */
function evaluateAlertScript(script, response, statusCode) {
  try {
    // Create a safe context for the custom script
    // The script should be in format: async shouldAlert(response){return true/false;}
    // or: function shouldAlert(response){return true/false;}
    
    // Strip 'async' keyword if present, as Apps Script doesn't support async/await
    let cleanScript = script.trim().replace(/^async\s+/, '');
    
    // Build a response object with safe properties
    const safeResponse = {
      statusCode: statusCode,
      getResponseCode: function() { return statusCode; },
      getContentText: function() { 
        try {
          return response.getContentText();
        } catch (e) {
          return '';
        }
      },
      getHeaders: function() {
        try {
          return response.getHeaders();
        } catch (e) {
          return {};
        }
      }
    };
    
    // Evaluate the custom script function
    let shouldAlert;
    
    // Check if the script defines a function or is a direct function
    if (cleanScript.includes('function shouldAlert')) {
      // Script defines shouldAlert function
      eval(cleanScript);
      shouldAlert = shouldAlert(safeResponse);
    } else if (cleanScript.startsWith('shouldAlert')) {
      // Script is function expression: shouldAlert(response){...}
      eval('function ' + cleanScript);
      shouldAlert = shouldAlert(safeResponse);
    } else {
      // Try to evaluate as direct expression
      shouldAlert = eval(cleanScript);
    }
    
    return Boolean(shouldAlert);
  } catch (e) {
    console.error(`Error evaluating alert script: ${e.message}`);
    console.error(`Script: ${script}`);
    // On error, fall back to default behavior (alert if status != 200)
    return (statusCode !== 200);
  }
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
  const headers = ['URL', 'Note', 'Status', 'LastStatus', 'LastCheck', 'AlertScript'];
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
  sheet.setColumnWidth(6, 400); // AlertScript column
  
  // Add sample data if the sheet is newly created
  if (sheet.getLastRow() === 1) {
    const sampleData = [
      ['https://example.com', 'Sample Website', 'Enable', '', '', ''],
      ['https://google.com', 'Google Homepage', 'Enable', '', '', ''],
      ['https://httpstat.us/405', 'Test 405 Status', 'Enable', '', '', 'shouldAlert(response){return response.statusCode !== 405;}']
    ];
    sheet.getRange(2, 1, sampleData.length, sampleData[0].length).setValues(sampleData);
    console.log('Added sample data to the sheet');
  }
  
  console.log('Sheet setup completed successfully!');
}
