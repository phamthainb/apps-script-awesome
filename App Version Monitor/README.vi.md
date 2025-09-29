# 📱 App Version Monitor (Google Apps Script)

Giám sát phiên bản ứng dụng trên **Google Play Store** và **Apple App Store** bằng Google Apps Script.  
Nếu phát hiện phiên bản mới, sẽ cập nhật Google Sheet và gửi thông báo đến Telegram.

---

## 🚀 Tính năng

* Hỗ trợ ứng dụng **iOS** (App Store) và **Android** (Google Play).
* Theo dõi nhiều ứng dụng với cài đặt theo quốc gia.
* Lưu trữ phiên bản, thời gian kiểm tra cuối và ghi chú phát hành trong Google Sheet.
* Gửi cảnh báo Telegram khi phát hiện phiên bản mới.
* Trigger theo thời gian để giám sát tự động.

---

## 📑 Thiết lập Google Sheet

Tạo một sheet có tên **`Apps`** với các cột sau:

| Platform | AppID         | Country | LastVersion | LastCheck | Notes |
| -------- | ------------- | ------- | ----------- | --------- | ----- |
| ios      | 284708449    | vn      |             |           |       |
| android  | com.zing.zalo | vn      |             |           |       |

* **Platform**: `ios` hoặc `android`.
* **AppID**:
  * iOS → App Store ID dạng số (từ link ứng dụng, ví dụ `id284708449`).
  * Android → tên package (ví dụ `com.zing.zalo`).
* **Country**: mã quốc gia 2 chữ cái (`us`, `vn`, `sg`, ...).
* **LastVersion, LastCheck, Notes**: sẽ được cập nhật tự động.

---

## 🔍 Cách lấy App ID

### iOS App Store ID

1. **Phương pháp 1 - Từ URL App Store:**
   - Vào App Store và tìm kiếm ứng dụng
   - Sao chép URL ứng dụng (ví dụ: `https://apps.apple.com/us/app/facebook/id284882215`)
   - Số sau `/id` là App ID của bạn: `284882215`

2. **Phương pháp 2 - Từ iTunes Link:**
   - Tìm ứng dụng trên [iTunes Preview](https://apps.apple.com/)
   - Click chuột phải → Copy Link
   - Trích xuất ID từ URL: `https://apps.apple.com/us/app/instagram/id389801252`
   - App ID: `389801252`

3. **Phương pháp 3 - Developer Console:**
   - Nếu bạn là developer, kiểm tra App Store Connect
   - App ID được hiển thị trong thông tin ứng dụng

### Android Package Name

1. **Phương pháp 1 - Từ URL Google Play:**
   - Vào Google Play Store và tìm kiếm ứng dụng
   - Sao chép URL ứng dụng (ví dụ: `https://play.google.com/store/apps/details?id=com.facebook.katana`)
   - Giá trị sau `id=` là package name: `com.facebook.katana`

2. **Phương pháp 2 - Từ thông tin App:**
   - Cài đặt ứng dụng trên thiết bị Android
   - Vào Settings → Apps → [Tên App] → Advanced
   - Package name được hiển thị trong chi tiết ứng dụng

3. **Phương pháp 3 - Developer Console:**
   - Nếu bạn là developer, kiểm tra Google Play Console
   - Package name được hiển thị trong dashboard ứng dụng

### Ví dụ các ứng dụng phổ biến

| Tên App | Platform | App ID / Package Name |
|---------|----------|-----------------------|
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
| Zalo | iOS | `579523206` |
| Zalo | Android | `com.zing.zalo` |
| Grab | iOS | `647268330` |
| Grab | Android | `com.grabtaxi.passenger` |

**💡 Mẹo:** Sử dụng function `setupSheet()` trong script để tự động tạo sheet với dữ liệu mẫu!

---

## 🛠️ Thiết lập Script

1. Mở **Extensions → Apps Script** trong Google Sheets.
2. Copy-paste code từ `Code.gs`.
3. Thay thế các placeholder:

```javascript
const TELEGRAM_TOKEN = 'YOUR_TELEGRAM_BOT_TOKEN';
const TELEGRAM_CHAT_ID = 'YOUR_CHAT_ID';
```

4. **Chạy Setup Function (Khuyến nghị):**
   - Trong Apps Script editor, chọn function `setupSheet`
   - Click nút **Run** để tự động tạo sheet với định dạng đúng
   - Điều này sẽ tạo sheet "Apps" với headers và dữ liệu mẫu

5. **Thiết lập thủ công (Thay thế):**
   - Tạo sheet có tên "Apps" thủ công
   - Thêm các cột như hiển thị trong bảng ở trên

---

## 📲 Thiết lập Telegram

1. Tạo bot với [BotFather](https://t.me/botfather).
2. Lấy **BOT TOKEN**.
3. Thêm bot vào group (hoặc DM).
4. Lấy **CHAT ID** (sử dụng [@RawDataBot](https://t.me/RawDataBot) hoặc tương tự).
5. Cập nhật script với `TELEGRAM_TOKEN` và `TELEGRAM_CHAT_ID`.

**💡 Tham khảo:** [Hướng dẫn chi tiết thiết lập Telegram Bot](../docs/telegram-bot-setup.vi.md)

---

## ⏲️ Thiết lập Trigger

1. Trong Apps Script, vào **Triggers** (biểu tượng `⏰`).
2. Thêm trigger:
   * Function: `checkAppVersions`
   * Event: Time-driven
   * Chọn tần suất (ví dụ: mỗi 6 giờ).

**💡 Tham khảo:** [Hướng dẫn chi tiết thiết lập Trigger](../docs/trigger-setup-guide.vi.md)

---

## 📡 Ví dụ thông báo Telegram

```
📱 Phát hiện cập nhật ứng dụng
Platform: ios
AppID: 1294940479
Country: vn
Phiên bản mới: 4.9.2
Ghi chú phát hành: Sửa lỗi và cải thiện hiệu suất.
```

---

## 🔧 Các function chính

### Kiểm tra phiên bản
- `checkAppVersions()` - Function chính để kiểm tra tất cả ứng dụng
- `checkiOSVersion(appId, country)` - Kiểm tra phiên bản iOS
- `checkAndroidVersion(packageName, country)` - Kiểm tra phiên bản Android

### Tiện ích
- `setupSheet()` - Khởi tạo sheet với headers và dữ liệu mẫu
- `sendTelegramMessage(message)` - Gửi thông báo đến Telegram
- `formatDate(date)` - Format ngày tháng

### API endpoints
- **iOS**: `https://itunes.apple.com/lookup?id=${appId}&country=${country}`
- **Android**: Parsing HTML từ Google Play Store

---

## 📊 Dữ liệu được theo dõi

### Thông tin cơ bản
- **Platform**: iOS hoặc Android
- **AppID**: App Store ID hoặc Package Name
- **Country**: Mã quốc gia (ảnh hưởng đến availability và giá cả)
- **LastVersion**: Phiên bản hiện tại được phát hiện
- **LastCheck**: Thời gian kiểm tra cuối cùng
- **Notes**: Ghi chú phát hành từ developer

### Thông tin chi tiết (trong log)
- **App Name**: Tên ứng dụng
- **Bundle ID**: Identifier duy nhất của ứng dụng
- **Release Date**: Ngày phát hành phiên bản
- **File Size**: Kích thước ứng dụng (iOS)
- **Minimum OS Version**: Phiên bản OS tối thiểu

---

## ⚠️ Lưu ý quan trọng

### Giới hạn và khuyến nghị
* Cấu trúc HTML của Google Play Store có thể thay đổi → regex có thể cần cập nhật.
* Đối với ứng dụng iOS chỉ có sẵn ở một số vùng, hãy đặt `Country` đúng.
* Tần suất trigger khuyến nghị: **mỗi 6 giờ** hoặc **hàng ngày** (tránh vượt quota).
* Một số ứng dụng có thể chặn request từ Google Apps Script.

### Rate limiting
- **iTunes API**: Không có giới hạn chính thức nhưng không nên abuse
- **Google Play**: Parsing HTML có thể bị chặn nếu request quá nhiều
- **Apps Script**: Giới hạn UrlFetch: 20,000 calls/day

### Error handling
```javascript
try {
  // Kiểm tra phiên bản
  const version = checkiOSVersion(appId, country);
} catch (error) {
  console.error(`Error checking ${appId}:`, error);
  // Log lỗi nhưng không dừng toàn bộ process
}
```

---

## 🔄 Workflow hoạt động

1. **Trigger chạy** (theo lịch đã thiết lập)
2. **Đọc danh sách app** từ sheet "Apps"
3. **Với mỗi app:**
   - Gọi API tương ứng (iTunes hoặc Google Play)
   - So sánh với phiên bản đã lưu
   - Nếu có phiên bản mới:
     - Cập nhật sheet
     - Gửi thông báo Telegram
     - Log thông tin chi tiết
4. **Cập nhật timestamp** cho lần kiểm tra cuối

---

## 🛠️ Troubleshooting

### Không phát hiện được phiên bản iOS
- Kiểm tra App ID có đúng không
- Kiểm tra country code (một số app không có ở mọi quốc gia)
- App có thể đã bị gỡ khỏi App Store

### Không phát hiện được phiên bản Android
- Kiểm tra package name có đúng không
- Google Play có thể đã thay đổi HTML structure
- App có thể không khả dụng ở country được chỉ định

### Không nhận được thông báo Telegram
- Kiểm tra Bot Token và Chat ID
- Bot phải được start trước khi gửi message
- Kiểm tra execution log trong Apps Script

### Script chạy chậm hoặc timeout
- Giảm số lượng app kiểm tra cùng lúc
- Kiểm tra network connectivity
- Một số API có thể phản hồi chậm

---

## 📱 Mở rộng tính năng

### Thêm thông tin chi tiết
```javascript
// Lấy thêm metadata
const appData = {
  name: result.trackName,
  version: result.version,
  releaseDate: result.currentVersionReleaseDate,
  fileSize: result.fileSizeBytes,
  minimumOsVersion: result.minimumOsVersion,
  averageRating: result.averageUserRating
};
```

### Theo dõi rating và reviews
```javascript
// Theo dõi thay đổi rating
if (oldRating !== newRating) {
  sendTelegramMessage(`📊 ${appName} rating changed: ${oldRating} → ${newRating}`);
}
```

### Export dữ liệu
```javascript
// Export lịch sử phiên bản
function exportVersionHistory() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Apps');
  const data = sheet.getDataRange().getValues();
  // Process và export data
}
```

---

## Ngôn ngữ / Language

- [🇺🇸 English](./README.md)
- [🇻🇳 Tiếng Việt](./README.vi.md)