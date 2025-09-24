const TELEGRAM_TOKEN = 'YOUR_TELEGRAM_BOT_TOKEN';
const TELEGRAM_CHAT_ID = 'YOUR_TELEGRAM_CHAT_ID';

function checkAppVersions() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Apps');
  const data = sheet.getDataRange().getValues();

  for (let i = 1; i < data.length; i++) { // skip header
    const platform = (data[i][0] || '').toString().trim().toLowerCase();
    const appId = (data[i][1] || '').toString().trim();
    const country = (data[i][2] || '').toString().trim() || 'us';

    if (!platform || !appId) continue;

    let appInfo = null;
    if (platform === 'ios') {
      appInfo = getIosVersion(appId, country);
    } else if (platform === 'android') {
      appInfo = getAndroidVersion(appId, country);
    }

    if (appInfo) {
      const lastVersion = data[i][3];
      const newVersion = appInfo.version;

      // Update sheet
      sheet.getRange(i + 1, 4).setValue(newVersion);   // LastVersion
      sheet.getRange(i + 1, 5).setValue(new Date());   // LastCheck
      sheet.getRange(i + 1, 6).setValue(appInfo.notes || ''); // Notes

      // If version changed -> notify
      if (lastVersion && lastVersion !== newVersion) {
        const message = `📱 *App Update Detected*\nPlatform: ${platform}\nAppID: ${appId}\nCountry: ${country}\nNew Version: ${newVersion}\nRelease Notes: ${appInfo.notes || 'N/A'}`;
        sendTelegram(message);
      }
    }
  }
}

function getIosVersion(appId, country = 'us') {
  const url = `https://itunes.apple.com/lookup?id=${appId}&country=${country}`;
  const res = UrlFetchApp.fetch(url);
  const json = JSON.parse(res.getContentText());

  if (json.results && json.results.length > 0) {
    const app = json.results[0];
    return {
      version: app.version,
      releaseDate: app.currentVersionReleaseDate,
      notes: app.releaseNotes
    };
  }
  return null;
}

function getAndroidVersion(packageName, country = 'us') {
  const url = `https://play.google.com/store/apps/details?id=${packageName}&hl=en&gl=${country}`;
  try {
    const res = UrlFetchApp.fetch(url);
    const html = res.getContentText();

    // Extract version with regex (Play Store HTML can change!)
    const match = html.match(/\"[\d.]+\"/);
    if (match) {
      return { version: match[0].replace(/"/g, ''), notes: '' };
    }
  } catch (e) {
    Logger.log(`Error fetching Android app ${packageName}: ${e}`);
  }
  return null;
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
