# Hướng dẫn Setup Trigger cho Google Apps Script

## Giới thiệu

Trigger là cơ chế tự động chạy các function trong Google Apps Script theo thời gian hoặc sự kiện nhất định. Đây là hướng dẫn chi tiết để thiết lập trigger cho các script monitoring.

## Các loại Trigger

### 1. Time-based Triggers (Trigger theo thời gian)
- **Specific date and time**: Chạy một lần vào thời điểm cụ thể
- **Minutes timer**: Chạy lặp lại theo phút (1, 5, 10, 15, 30 phút)
- **Hours timer**: Chạy lặp lại theo giờ (1, 2, 4, 6, 8, 12 giờ)
- **Daily**: Chạy hàng ngày vào giờ cố định
- **Weekly**: Chạy hàng tuần vào ngày và giờ cố định
- **Monthly**: Chạy hàng tháng

### 2. Event-based Triggers (Trigger theo sự kiện)
- **On form submit**: Khi form được submit
- **On spreadsheet edit**: Khi spreadsheet được chỉnh sửa
- **On document open**: Khi document được mở

## Cách thiết lập Trigger

### Phương pháp 1: Sử dụng Apps Script Editor (Khuyến nghị)

1. **Mở Apps Script Editor**
   - Vào [script.google.com](https://script.google.com)
   - Mở project của bạn

2. **Vào phần Triggers**
   - Click vào biểu tượng đồng hồ ⏰ ở sidebar trái
   - Hoặc vào menu **Triggers** → **Manage triggers**

3. **Thêm Trigger mới**
   - Click **+ Add Trigger**
   - Cấu hình các thông số:
     - **Choose which function to run**: Chọn function cần chạy (vd: `checkUrls`, `checkAppVersions`)
     - **Choose which deployment should run**: Chọn `Head`
     - **Select event source**: Chọn `Time-driven`
     - **Select type of time based trigger**: Chọn loại trigger
     - **Select time interval**: Chọn tần suất chạy

4. **Lưu Trigger**
   - Click **Save**
   - Cấp quyền nếu được yêu cầu

### Phương pháp 2: Sử dụng Code (Nâng cao)

```javascript
function createTimeTrigger() {
  // Xóa tất cả trigger cũ (tùy chọn)
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(trigger => ScriptApp.deleteTrigger(trigger));
  
  // Tạo trigger mới - chạy mỗi 5 phút
  ScriptApp.newTrigger('checkUrls')
    .timeBased()
    .everyMinutes(5)
    .create();
  
  // Hoặc tạo trigger chạy hàng ngày lúc 9:00 AM
  ScriptApp.newTrigger('dailyCheck')
    .timeBased()
    .everyDays(1)
    .atHour(9)
    .create();
    
  console.log('Trigger đã được tạo thành công!');
}
```

## Khuyến nghị thiết lập cho từng loại Monitor

### URL Monitor
- **Tần suất khuyến nghị**: Mỗi 5-15 phút
- **Function**: `checkUrls`
- **Lý do**: Phát hiện sự cố website nhanh chóng

### App Version Monitor  
- **Tần suất khuyến nghị**: Mỗi 1-6 giờ
- **Function**: `checkAppVersions`
- **Lý do**: App version không thay đổi thường xuyên

### SSL Monitor
- **Tần suất khuyến nghị**: Hàng ngày
- **Function**: `checkSSLCertificates`
- **Lý do**: SSL certificate có thời hạn dài, check hàng ngày là đủ

## Quản lý Trigger

### Xem danh sách Trigger
```javascript
function listAllTriggers() {
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach((trigger, index) => {
    console.log(`Trigger ${index + 1}:`);
    console.log(`- Function: ${trigger.getHandlerFunction()}`);
    console.log(`- Type: ${trigger.getEventType()}`);
    console.log(`- UID: ${trigger.getUniqueId()}`);
  });
}
```

### Xóa tất cả Trigger
```javascript
function deleteAllTriggers() {
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(trigger => ScriptApp.deleteTrigger(trigger));
  console.log(`Đã xóa ${triggers.length} trigger(s)`);
}
```

### Xóa Trigger cụ thể
```javascript
function deleteTriggerByFunction(functionName) {
  const triggers = ScriptApp.getProjectTriggers();
  const toDelete = triggers.filter(trigger => 
    trigger.getHandlerFunction() === functionName
  );
  
  toDelete.forEach(trigger => ScriptApp.deleteTrigger(trigger));
  console.log(`Đã xóa ${toDelete.length} trigger(s) cho function ${functionName}`);
}
```

## Giới hạn và Lưu ý

### Giới hạn của Google Apps Script
- **Execution time**: Tối đa 6 phút/lần chạy (cho trigger)
- **Trigger quota**: Tối đa 20 trigger/project
- **Daily executions**: Giới hạn theo loại tài khoản (Gmail: 6 giờ/ngày)

### Best Practices
1. **Không tạo quá nhiều trigger** - Sử dụng 1 trigger cho nhiều task
2. **Handle errors gracefully** - Sử dụng try-catch để tránh trigger bị dừng
3. **Log activities** - Ghi log để debug và monitor
4. **Optimize execution time** - Tránh chạy quá lâu

### Error Handling Example
```javascript
function monitorWithErrorHandling() {
  try {
    // Logic chính của bạn
    checkUrls();
    checkAppVersions();
    
  } catch (error) {
    console.error('Error in monitoring:', error);
    
    // Gửi thông báo lỗi qua Telegram (tùy chọn)
    const telegramToken = 'YOUR_BOT_TOKEN';
    const chatId = 'YOUR_CHAT_ID';
    sendTelegramMessage(
      `❌ Error in monitoring script: ${error.message}`,
      telegramToken,
      chatId
    );
  }
}
```

## Troubleshooting

### Trigger không chạy
1. **Kiểm tra permissions** - Đảm bảo đã cấp đủ quyền
2. **Check execution log** - Vào **Executions** để xem log
3. **Verify function name** - Đảm bảo tên function chính xác
4. **Check quotas** - Xem có vượt giới hạn không

### Trigger chạy nhưng có lỗi
1. **Xem execution log** chi tiết
2. **Test function manually** trước khi setup trigger
3. **Add error handling** trong code
4. **Check API limits** của các service bên ngoài

## Kết luận

Trigger là công cụ mạnh mẽ để tự động hóa các task monitoring. Hãy thiết lập phù hợp với nhu cầu và luôn monitor execution log để đảm bảo hoạt động ổn định.

---

**Liên kết hữu ích:**
- [Apps Script Triggers Documentation](https://developers.google.com/apps-script/guides/triggers)
- [Apps Script Quotas and Limitations](https://developers.google.com/apps-script/guides/services/quotas)