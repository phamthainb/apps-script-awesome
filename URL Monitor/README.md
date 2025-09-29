# URL Monitor with Google Apps Script

A simple uptime monitor built with **Google Apps Script**.  
It checks a list of URLs from Google Sheets and sends alerts to Telegram if any website is down.  
Inspired by [Uptime Kuma](https://github.com/louislam/uptime-kuma).

---

## Features
- Read URLs from a Google Sheet
- Periodically check website status using `UrlFetchApp`
- Log the status and last check time in the sheet
- Send alerts to Telegram when a site is **DOWN**

---

## Setup

### 1. Prepare Google Sheet
Create a sheet named **`Websites`** with the following columns:

| URL              | Note           | LastStatus | LastCheck          |
|------------------|----------------|------------|--------------------|
| https://abc.com  | Main Website   |            |                    |
| https://xyz.com  | API Service    |            |                    |

- Column A: URL to check  
- Column B: Optional note  
- Column C: Last HTTP status code (auto-updated)  
- Column D: Last checked timestamp (auto-updated)  

---

### 2. Open Apps Script Editor
1. In your Google Sheet, go to **Extensions → Apps Script**.  
2. Replace the default code with the script from this repo.  
3. Set your Telegram bot credentials:

```javascript
const TELEGRAM_TOKEN = 'YOUR_TELEGRAM_BOT_TOKEN';
const TELEGRAM_CHAT_ID = 'YOUR_CHAT_ID';
```

### 3. Set Up Trigger
1. In Apps Script, go to **Triggers** (`⏰` icon).
2. Add trigger:
   - Function: `checkUrls`
   - Event: Time-driven
   - Choose frequency (e.g., every 5 minutes)

**💡 Reference:** [Detailed Trigger Setup Guide](../docs/trigger-setup-guide.en.md)

---

## How It Works

1. Script reads all URLs from "Websites" sheet
2. For each URL, performs HTTP request
3. Logs status code and check time
4. If website is down (status code != 200), sends Telegram alert
5. If website comes back up, sends recovery notification

---

## Telegram Notifications

### When website is DOWN:
```
🚨 WEBSITE DOWN
URL: https://example.com
Status: 500 Internal Server Error
Time: 2023-12-01 14:30:25
```

### When website is back UP:
```
✅ WEBSITE RECOVERED
URL: https://example.com
Status: 200 OK
Downtime: 15 minutes
```

---

## Main Functions

- `checkUrls()` - Main function to check all URLs
- `setupSheet()` - Initialize sheet with proper format
- `sendTelegramMessage(message)` - Send notification to Telegram

---

## Advanced Configuration

### Customize timeout
```javascript
const options = {
  'method': 'GET',
  'followRedirects': true,
  'muteHttpExceptions': true,
  'timeout': 30000 // 30 seconds
};
```

### Check response content
```javascript
// Check both status code and response content
if (response.getResponseCode() === 200) {
  const content = response.getContentText();
  if (content.includes('expected content')) {
    // Website OK
  } else {
    // Website has content issues
  }
}
```

---

## Recommendations

- **Check frequency**: 5-15 minutes for critical websites
- **Timeout**: 30 seconds to avoid false positives
- **Error handling**: Always use `muteHttpExceptions: true`
- **Rate limiting**: Don't check too frequently to avoid being blocked

---

## Troubleshooting

### Website shows DOWN but actually working
- Check timeout settings
- Check redirect handling
- See if any IPs are blocked

### Not receiving Telegram notifications
- Check Bot Token and Chat ID
- Ensure bot has been started
- Check execution log in Apps Script

### Script running slowly
- Reduce number of URLs checked simultaneously
- Increase timeout appropriately
- Use parallel requests (advanced)

---

## Language / Ngôn ngữ

- [🇺🇸 English](./README.md)
- [🇻🇳 Tiếng Việt](./README.vi.md)
