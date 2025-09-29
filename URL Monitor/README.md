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
