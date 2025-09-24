# 📱 App Version Monitor (Google Apps Script)

Monitor app versions on **Google Play Store** and **Apple App Store** using Google Apps Script.
If a new version is detected, it updates Google Sheet and sends a notification to Telegram.

---

## 🚀 Features

* Support **iOS** (App Store) and **Android** (Google Play) apps.
* Track multiple apps with country-specific settings.
* Store version, last check time, and release notes in Google Sheet.
* Send Telegram alert when a new version is detected.
* Time-based trigger for automatic monitoring.

---

## 📑 Google Sheet Setup

Create a sheet named **`Apps`** with the following columns:

| Platform | AppID         | Country | LastVersion | LastCheck | Notes |
| -------- | ------------- | ------- | ----------- | --------- | ----- |
| ios      | 284708449    | vn      |             |           |       |
| android  | com.zing.zalo | vn      |             |           |       |

* **Platform**: `ios` or `android`.
* **AppID**:

  * iOS → numeric App Store ID (from app link, e.g. `id284708449`).
  * Android → package name (e.g. `com.zing.zalo`).
* **Country**: two-letter country code (`us`, `vn`, `sg`, ...).
* **LastVersion, LastCheck, Notes**: will be updated automatically.

---

## 🛠️ Script Setup

1. Open **Extensions → Apps Script** in Google Sheets.
2. Copy-paste the code from `AppVersionMonitor.gs`.
3. Replace placeholders:

```javascript
const TELEGRAM_TOKEN = 'YOUR_TELEGRAM_BOT_TOKEN';
const TELEGRAM_CHAT_ID = 'YOUR_CHAT_ID';
```

---

## 📲 Telegram Setup

1. Create a bot with [BotFather](https://t.me/botfather).
2. Get **BOT TOKEN**.
3. Add your bot to a group (or DM).
4. Get **CHAT ID** (use [@RawDataBot](https://t.me/RawDataBot) or similar).
5. Update the script with `TELEGRAM_TOKEN` and `TELEGRAM_CHAT_ID`.

---

## ⏲️ Trigger Setup

1. In Apps Script, go to **Triggers** (`⏰` icon).
2. Add trigger:

   * Function: `checkAppVersions`
   * Event: Time-driven
   * Choose frequency (e.g. every 6 hours).

---

## 📡 Example Telegram Alert

```
📱 App Update Detected
Platform: ios
AppID: 1294940479
Country: vn
New Version: 4.9.2
Release Notes: Bug fixes and improvements.
```

---

## ⚠️ Notes

* Google Play Store HTML structure may change → regex might need update.
* For iOS apps available only in certain regions, set the correct `Country`.
* Recommended trigger interval: **every 6h** or **daily** (avoid quota issues).
