const TELEGRAM_TOKEN = 'YOUR_TELEGRAM_BOT_TOKEN';
const TELEGRAM_CHAT_ID = 'YOUR_CHAT_ID';

function checkWebsites() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Websites');
  const data = sheet.getDataRange().getValues();

  for (let i = 1; i < data.length; i++) { // skip header row
    const url = data[i][0];
    if (!url) continue;

    let statusCode, message;
    try {
      const response = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
      statusCode = response.getResponseCode();
    } catch (e) {
      statusCode = 'DOWN';
    }

    // Update the sheet
    sheet.getRange(i + 1, 3).setValue(statusCode); // LastStatus
    sheet.getRange(i + 1, 4).setValue(new Date()); // LastCheck

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
