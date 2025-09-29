const TELEGRAM_TOKEN = 'YOUR_TELEGRAM_BOT_TOKEN';
const TELEGRAM_CHAT_ID = 'YOUR_CHAT_ID';
const SSL_ALERT_DAYS = 30; // Alert when SSL expires within this many days
const SSL_CHECKER_API = 'https://ssl-checker-production-cc05.up.railway.app/check'; // SSL checker API endpoint

function mainCheckSSL() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Domains');
  const data = sheet.getDataRange().getValues();

  for (let i = 1; i < data.length; i++) { // skip header row
    const domain = data[i][0];
    const alertDays = data[i][1] || SSL_ALERT_DAYS; // Use config from sheet or default
    
    if (!domain) continue;

    let sslData, message;
    try {
      const apiUrl = `${SSL_CHECKER_API}?host=${domain}`;
      const response = UrlFetchApp.fetch(apiUrl, { muteHttpExceptions: true });
      
      if (response.getResponseCode() === 200) {
        sslData = JSON.parse(response.getContentText());
        
        // Update the sheet with SSL information
        sheet.getRange(i + 1, 3).setValue(sslData.days_remaining); // Days remaining
        sheet.getRange(i + 1, 4).setValue(sslData.valid_to); // Expiry date
        sheet.getRange(i + 1, 5).setValue(sslData.issuer.CN); // Issuer
        sheet.getRange(i + 1, 6).setValue(new Date()); // Last check
        
        // Check if SSL certificate is expiring soon
        if (sslData.days_remaining <= alertDays) {
          message = `🚨 SSL Certificate Expiring Soon!\n` +
                   `Domain: ${sslData.hostname}\n` +
                   `Days Remaining: ${sslData.days_remaining}\n` +
                   `Expires: ${sslData.valid_to}\n` +
                   `Issuer: ${sslData.issuer.CN}`;
          sendTelegram(message);
        }
      } else {
        throw new Error(`API returned status: ${response.getResponseCode()}`);
      }
    } catch (e) {
      // Update sheet with error status
      sheet.getRange(i + 1, 3).setValue('ERROR');
      sheet.getRange(i + 1, 6).setValue(new Date()); // Last check
      
      message = `❌ SSL Check Failed\nDomain: ${domain}\nError: ${e.message}`;
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

function setupSheet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Domains') || 
                SpreadsheetApp.getActiveSpreadsheet().insertSheet('Domains');
  
  // Set up headers
  const headers = ['Domain', 'Alert Days', 'Days Remaining', 'Expires', 'Issuer', 'Last Check'];
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  
  // Format headers
  sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
  sheet.autoResizeColumns(1, headers.length);
  
  Logger.log('Sheet setup complete. Add your domains in column A and optional alert days in column B.');
}

function getSSLDetails(hostname) {
  try {
    const apiUrl = `${SSL_CHECKER_API}?host=${hostname}`;
    const response = UrlFetchApp.fetch(apiUrl);
    
    if (response.getResponseCode() === 200) {
      const data = JSON.parse(response.getContentText());
      return {
        success: true,
        data: data
      };
    } else {
      return {
        success: false,
        error: `API returned status: ${response.getResponseCode()}`
      };
    }
  } catch (e) {
    return {
      success: false,
      error: e.message
    };
  }
}
