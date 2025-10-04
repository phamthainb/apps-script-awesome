# URL Monitor với Google Apps Script

Công cụ giám sát uptime đơn giản được xây dựng với **Google Apps Script**.  
Nó kiểm tra danh sách URL từ Google Sheets và gửi cảnh báo đến Telegram nếu có website nào bị down.  
Lấy cảm hứng từ [Uptime Kuma](https://github.com/louislam/uptime-kuma).

---

## Tính năng
- Đọc URL từ Google Sheet
- Kiểm tra trạng thái website định kỳ bằng `UrlFetchApp`
- Ghi log trạng thái và thời gian kiểm tra cuối trong sheet
- Gửi cảnh báo đến Telegram khi website **DOWN**

---

## Thiết lập

### 1. Chuẩn bị Google Sheet
Tạo một sheet có tên **`Websites`** với các cột sau:

| URL              | Note           | Status   | LastStatus | LastCheck          |
|------------------|----------------|----------|------------|--------------------|
| https://abc.com  | Main Website   | Active   |            |                    |
| https://xyz.com  | API Service    | Active   |            |                    |

- Cột A: URL cần kiểm tra  
- Cột B: Ghi chú tùy chọn  
- Cột C: Trạng thái (Active/Inactive) - chỉ kiểm tra URL có trạng thái Active  
- Cột D: Mã trạng thái HTTP cuối cùng (tự động cập nhật)  
- Cột E: Timestamp kiểm tra cuối (tự động cập nhật)  

---

### 2. Mở Apps Script Editor
1. Trong Google Sheet của bạn, vào **Extensions → Apps Script**.  
2. Thay thế code mặc định bằng script từ repo này.  
3. Thiết lập thông tin bot Telegram:

```javascript
const TELEGRAM_TOKEN = 'YOUR_TELEGRAM_BOT_TOKEN';
const TELEGRAM_CHAT_ID = 'YOUR_CHAT_ID';
```

### 3. Thiết lập Trigger
1. Trong Apps Script, vào **Triggers** (biểu tượng `⏰`).
2. Thêm trigger:
   - Function: `checkUrls`
   - Event: Time-driven
   - Chọn tần suất (ví dụ: mỗi 5 phút)

---

## Cách thức hoạt động

1. Script đọc tất cả URL từ sheet "Websites"
2. Với mỗi URL, thực hiện HTTP request
3. Ghi log mã trạng thái và thời gian kiểm tra
4. Nếu website down (status code != 200), gửi cảnh báo Telegram
5. Nếu website trở lại hoạt động, gửi thông báo phục hồi

---

## Thông báo Telegram

### Khi website DOWN:
```
🚨 WEBSITE DOWN
URL: https://example.com
Status: 500 Internal Server Error
Time: 2023-12-01 14:30:25
```

### Khi website trở lại UP:
```
✅ WEBSITE RECOVERED
URL: https://example.com
Status: 200 OK
Downtime: 15 minutes
```

---

## Các function chính

- `checkUrls()` - Function chính để kiểm tra tất cả URL
- `setupSheet()` - Khởi tạo sheet với định dạng đúng
- `sendTelegramMessage(message)` - Gửi thông báo đến Telegram

---

## Cấu hình nâng cao

### Tùy chỉnh timeout
```javascript
const options = {
  'method': 'GET',
  'followRedirects': true,
  'muteHttpExceptions': true,
  'timeout': 30000 // 30 giây
};
```

### Kiểm tra nội dung response
```javascript
// Kiểm tra cả status code và nội dung response
if (response.getResponseCode() === 200) {
  const content = response.getContentText();
  if (content.includes('expected content')) {
    // Website OK
  } else {
    // Website có vấn đề về nội dung
  }
}
```

---

## Khuyến nghị

- **Tần suất kiểm tra**: 5-15 phút cho website quan trọng
- **Timeout**: 30 giây để tránh false positive
- **Error handling**: Luôn sử dụng `muteHttpExceptions: true`
- **Rate limiting**: Không kiểm tra quá thường xuyên để tránh bị chặn

---

## Troubleshooting

### Website hiển thị DOWN nhưng thực tế hoạt động
- Kiểm tra timeout setting
- Kiểm tra redirect handling
- Xem có IP nào bị chặn không

### Không nhận được thông báo Telegram
- Kiểm tra Bot Token và Chat ID
- Đảm bảo bot đã được start
- Xem execution log trong Apps Script

### Script chạy chậm
- Giảm số lượng URL kiểm tra cùng lúc
- Tăng timeout appropriately
- Sử dụng parallel requests (nâng cao)

---

## Ngôn ngữ / Language

- [🇺🇸 English](./README.md)
- [🇻🇳 Tiếng Việt](./README.vi.md)