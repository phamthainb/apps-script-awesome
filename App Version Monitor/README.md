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

## 🔍 How to Get App ID

### iOS App Store ID

1. **Method 1 - From App Store URL:**
   - Go to App Store and search for your app
   - Copy the app URL (e.g., `https://apps.apple.com/us/app/facebook/id284882215`)
   - The number after `/id` is your App ID: `284882215`

2. **Method 2 - From iTunes Link:**
   - Search app on [iTunes Preview](https://apps.apple.com/)
   - Right-click → Copy Link
   - Extract ID from URL: `https://apps.apple.com/us/app/instagram/id389801252`
   - App ID: `389801252`

3. **Method 3 - Developer Console:**
   - If you're the developer, check App Store Connect
   - App ID is shown in app information

### Android Package Name

1. **Method 1 - From Google Play URL:**
   - Go to Google Play Store and search for your app
   - Copy the app URL (e.g., `https://play.google.com/store/apps/details?id=com.facebook.katana`)
   - The value after `id=` is your package name: `com.facebook.katana`

2. **Method 2 - From App Info:**
   - Install the app on Android device
   - Go to Settings → Apps → [App Name] → Advanced
   - Package name is shown in app details

3. **Method 3 - Developer Console:**
   - If you're the developer, check Google Play Console
   - Package name is shown in app dashboard

### Popular Apps Examples

| App Name | Platform | App ID / Package Name |
|----------|----------|-----------------------|
| Facebook | iOS | `284882215` |
| Facebook | Android | `com.facebook.katana` |
| Instagram | iOS | `389801252` |
| Instagram | Android | `com.instagram.android` |
| WhatsApp | iOS | `310633997` |
| WhatsApp | Android | `com.whatsapp` |
| YouTube | iOS | `544007664` |
| YouTube | Android | `com.google.android.youtube` |
| TikTok | iOS | `835599320` |
| TikTok | Android | `com.zhiliaoapp.musically` |

**💡 Tip:** Use the `setupSheet()` function in the script to automatically create the sheet with example data!

---

## 🛠️ Script Setup

1. Open **Extensions → Apps Script** in Google Sheets.
2. Copy-paste the code from `Code.gs`.
3. Replace placeholders:

```javascript
const TELEGRAM_TOKEN = 'YOUR_TELEGRAM_BOT_TOKEN';
const TELEGRAM_CHAT_ID = 'YOUR_CHAT_ID';
```

4. **Run Setup Function (Recommended):**
   - In Apps Script editor, select `setupSheet` function
   - Click **Run** button to automatically create the sheet with proper format
   - This will create the "Apps" sheet with headers and example data

5. **Manual Setup (Alternative):**
   - Create a sheet named "Apps" manually
   - Add the columns as shown in the table above

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

---

## Language / Ngôn ngữ

- [🇺🇸 English](./README.md)
- [🇻🇳 Tiếng Việt](./README.vi.md)
