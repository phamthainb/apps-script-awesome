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

| URL              | Note           | Status   | LastStatus | LastCheck          | AlertScript                                      |
|------------------|----------------|----------|------------|--------------------|-------------------------------------------------|
| https://abc.com  | Main Website   | Enable   |            |                    |                                                 |
| https://xyz.com  | API Service    | Enable   |            |                    | shouldAlert(response){return response.statusCode !== 401;} |

- Column A: URL to check  
- Column B: Optional note  
- Column C: Status (Enable/Disable) - only Enable URLs will be checked  
- Column D: Last HTTP status code (auto-updated)  
- Column E: Last checked timestamp (auto-updated)  
- Column F: Custom alert script (optional) - JavaScript function to determine if alert should be sent

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

### Custom Alert Scripts

You can define custom JavaScript functions in the **AlertScript** column to control when alerts should be sent. This is useful when a website returns non-200 status codes but is still considered "live".

**Format:**
```javascript
shouldAlert(response){return true/false;}
```

or with `async` keyword (will be automatically stripped):
```javascript
async shouldAlert(response){return true/false;}
```

**Available response properties:**
- `response.statusCode` - The HTTP status code
- `response.getResponseCode()` - Method to get status code
- `response.getContentText()` - Method to get response body
- `response.getHeaders()` - Method to get response headers

**Examples:**

1. **Don't alert for 401 (Unauthorized):**
```javascript
shouldAlert(response){return response.statusCode !== 401;}
```

2. **Don't alert for 405 (Method Not Allowed):**
```javascript
shouldAlert(response){return response.statusCode !== 405;}
```

3. **Only alert for server errors (5xx):**
```javascript
shouldAlert(response){return response.statusCode >= 500;}
```

4. **Alert for non-2xx responses except 401 and 405:**
```javascript
shouldAlert(response){
  const code = response.statusCode;
  if (code === 401 || code === 405) return false;
  return code < 200 || code >= 300;
}
```

5. **Check response content:**
```javascript
shouldAlert(response){
  if (response.statusCode !== 200) return true;
  const content = response.getContentText();
  return !content.includes('expected text');
}
```

**Note:** If no custom script is provided, the default behavior is to alert when status code is not 200.

### Customize timeout
```javascript
const options = {
  'method': 'GET',
  'followRedirects': true,
  'muteHttpExceptions': true,
  'timeout': 30000 // 30 seconds
};
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
