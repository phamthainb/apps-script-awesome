# SSL Monitor

Google Apps Script này giám sát chứng chỉ SSL cho nhiều domain và gửi cảnh báo Telegram khi chứng chỉ sắp hết hạn.

---

## Tính năng

- Giám sát chứng chỉ SSL cho nhiều domain
- Ngưỡng cảnh báo có thể cấu hình (số ngày trước khi hết hạn)
- Thông báo Telegram cho chứng chỉ sắp hết hạn
- Theo dõi thông tin chi tiết chứng chỉ SSL
- Xử lý lỗi và ghi log

---

## Thiết lập

1. **Tạo Google Spreadsheet** với sheet có tên "Domains"

2. **Chạy function `setupSheet()`** để tạo headers đúng định dạng:
   - Domain
   - Alert Days
   - Days Remaining
   - Expires
   - Issuer
   - Last Check

3. **Cấu hình bot Telegram**:
   - Thay thế `YOUR_TELEGRAM_BOT_TOKEN` bằng bot token thực
   - Thay thế `YOUR_CHAT_ID` bằng chat ID của bạn

4. **Thêm domain cần giám sát**:
   - Cột A: Tên domain (ví dụ: `vnpt.com.vn`)
   - Cột B: Số ngày cảnh báo (tùy chọn, mặc định 30 ngày)

---

## Sử dụng

### Kiểm tra thủ công
Chạy function `checkSSL()` để kiểm tra tất cả domain ngay lập tức.

### Giám sát tự động
Thiết lập trigger theo thời gian để chạy `checkSSL()` tự động:
1. Vào Apps Script Editor → Triggers
2. Thêm trigger cho function `checkSSL`
3. Chọn trigger theo thời gian (ví dụ: hàng ngày)

**💡 Tham khảo:** [Hướng dẫn chi tiết thiết lập Trigger](../docs/trigger-setup-guide.vi.md)

---

## API Response

Script sử dụng SSL checker API: `https://ssl-checker-production-cc05.up.railway.app/check?host=DOMAIN`

Ví dụ response:
```json
{
  "hostname": "gg.com",
  "issuer": {
    "C": "BE",
    "O": "GlobalSign nv-sa",
    "CN": "GlobalSign RSA OV SSL CA 2018"
  },
  "subject": {
    "C": "VN",
    "ST": "Ha Noi",
    "L": "Ha Noi",
    "O": "VIETNAM POSTS AND TELECOMMUNICATIONS GROUP",
    "CN": "*.gg.com"
  },
  "valid_from": "Aug  6 09:02:07 2025 GMT",
  "valid_to": "Sep  7 09:02:06 2026 GMT",
  "days_remaining": 343,
  "server_info": {
    "tls": { /* Chi tiết cấu hình TLS */ },
    "node": { /* Thông tin môi trường Node.js */ }
  }
}
```

---

## Self-Hosting SSL Checker API

Để có độ tin cậy và kiểm soát tốt hơn, bạn có thể tự host SSL checker API bằng repository mã nguồn mở: [https://github.com/phamthai072/ssl-checker](https://github.com/phamthai072/ssl-checker)

### Các tùy chọn Deploy nhanh

#### 1. Deploy lên Railway
[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/VE3HTF)

1. Click nút Railway deploy
2. Kết nối tài khoản GitHub
3. Deploy service
4. Lấy Railway app URL (ví dụ: `https://your-app.railway.app`)
5. Cập nhật constant `SSL_CHECKER_API` trong code:
   ```javascript
   const SSL_CHECKER_API = 'https://your-app.railway.app/check';
   ```

#### 2. Deploy lên Heroku
1. Clone repository:
   ```bash
   git clone https://github.com/phamthai072/ssl-checker.git
   cd ssl-checker
   ```
2. Tạo Heroku app:
   ```bash
   heroku create your-ssl-checker
   ```
3. Deploy:
   ```bash
   git push heroku main
   ```
4. Cập nhật constant `SSL_CHECKER_API` với Heroku URL

#### 3. Deploy lên Vercel
1. Fork repository: [https://github.com/phamthai072/ssl-checker](https://github.com/phamthai072/ssl-checker)
2. Import vào Vercel từ GitHub
3. Deploy với cài đặt mặc định
4. Cập nhật constant `SSL_CHECKER_API` với Vercel URL

#### 4. Docker Deployment
1. Clone và build:
   ```bash
   git clone https://github.com/phamthai072/ssl-checker.git
   cd ssl-checker
   docker build -t ssl-checker .
   docker run -p 3000:3000 ssl-checker
   ```
2. Truy cập tại `http://localhost:3000`

#### 5. Development cục bộ
1. Clone repository:
   ```bash
   git clone https://github.com/phamthai072/ssl-checker.git
   cd ssl-checker
   ```
2. Cài đặt dependencies:
   ```bash
   npm install
   ```
3. Khởi động server:
   ```bash
   npm start
   ```
4. Truy cập tại `http://localhost:3000`
5. Để test cục bộ, cập nhật constant:
   ```javascript
   const SSL_CHECKER_API = 'http://localhost:3000/check';
   ```

### Lợi ích của Self-Hosting

- **Độ tin cậy**: Không phụ thuộc vào dịch vụ bên ngoài
- **Bảo mật**: SSL check diễn ra trên hạ tầng của bạn
- **Tùy chỉnh**: Sửa đổi API phù hợp với nhu cầu cụ thể
- **Rate Limits**: Kiểm soát rate limiting của riêng bạn
- **Uptime**: Kiểm soát tốt hơn về tính khả dụng của dịch vụ

### Cấu hình sau khi Self-Host

Sau khi deploy SSL checker API riêng, cập nhật cấu hình trong Google Apps Script:

```javascript
const SSL_CHECKER_API = 'https://your-domain.com/check'; // API tự host của bạn
```

API endpoint phải phản hồi GET requests tại `/check?host=DOMAIN` và trả về cấu trúc JSON giống như trong phần API Response ở trên.

---

## Các Functions

- `checkSSL()` - Function chính để kiểm tra tất cả domain
- `setupSheet()` - Khởi tạo spreadsheet với headers đúng định dạng
- `getSSLDetails(hostname)` - Lấy chi tiết SSL cho domain cụ thể
- `sendTelegram(text)` - Gửi thông báo đến Telegram

---

## Cấu hình

- `SSL_ALERT_DAYS`: Số ngày mặc định trước khi hết hạn để kích hoạt cảnh báo (30 ngày)
- Domain riêng lẻ có thể có ngưỡng cảnh báo tùy chỉnh ở cột B

---

## Cảnh báo

Script gửi cảnh báo Telegram khi:
- Chứng chỉ SSL hết hạn trong số ngày đã cấu hình
- Kiểm tra SSL thất bại hoặc gặp lỗi

Thông báo cảnh báo bao gồm:
- Tên domain
- Số ngày còn lại đến khi hết hạn
- Ngày hết hạn
- Nhà phát hành chứng chỉ

### Ví dụ thông báo

#### Cảnh báo sắp hết hạn:
```
🚨 CẢNH BÁO SSL SẮP HẾT HẠN

Domain: example.com
Còn lại: 15 ngày
Hết hạn: 2024-02-15 08:30:00
Nhà phát hành: Let's Encrypt Authority X3
```

#### Thông báo lỗi:
```
❌ LỖI KIỂM TRA SSL

Domain: example.com
Lỗi: Connection timeout
Thời gian kiểm tra: 2024-01-31 14:25:00
```

---

## 🔧 Workflow hoạt động

1. **Trigger chạy** (theo lịch đã thiết lập)
2. **Đọc danh sách domain** từ sheet "Domains"
3. **Với mỗi domain:**
   - Gọi SSL Checker API
   - Parse thông tin chứng chỉ
   - Tính số ngày còn lại
   - So sánh với ngưỡng cảnh báo
   - Nếu cần cảnh báo:
     - Gửi thông báo Telegram
     - Cập nhật sheet với thông tin mới
     - Log chi tiết vào console
4. **Cập nhật timestamp** cho lần kiểm tra cuối

---

## 📊 Dữ liệu được theo dõi

### Thông tin cơ bản
- **Domain**: Tên miền cần kiểm tra
- **Alert Days**: Số ngày trước hết hạn để cảnh báo
- **Days Remaining**: Số ngày còn lại đến khi hết hạn
- **Expires**: Ngày giờ hết hạn chứng chỉ
- **Issuer**: Tổ chức phát hành chứng chỉ
- **Last Check**: Thời gian kiểm tra cuối cùng

### Thông tin chi tiết (trong API response)
- **Subject**: Thông tin chủ sở hữu chứng chỉ
- **Valid From**: Ngày bắt đầu hiệu lực
- **TLS Configuration**: Cấu hình TLS/SSL
- **Certificate Chain**: Chuỗi chứng chỉ

---

## ⚠️ Lưu ý quan trọng

### Tần suất kiểm tra
- **Khuyến nghị**: Hàng ngày hoặc mỗi 12 giờ
- **Không nên**: Kiểm tra quá thường xuyên (dưới 1 giờ)
- **Lý do**: SSL certificate có thời hạn dài, kiểm tra thường xuyên không cần thiết

### Giới hạn và quota
- **Apps Script**: 20,000 UrlFetch calls/day
- **External API**: Có thể có rate limiting
- **Timeout**: Default 30 giây cho mỗi request

### Error handling
```javascript
try {
  const sslData = getSSLDetails(domain);
  // Process SSL data
} catch (error) {
  console.error(`Error checking SSL for ${domain}:`, error);
  // Gửi thông báo lỗi
  sendTelegram(`❌ Lỗi kiểm tra SSL cho ${domain}: ${error.message}`);
}
```

---

## 🛠️ Troubleshooting

### Domain không kiểm tra được
- Kiểm tra domain có đúng format không
- Domain có thể không có SSL certificate
- Firewall có thể chặn request từ Google Apps Script

### Thông báo Telegram không gửi được
- Kiểm tra Bot Token và Chat ID
- Bot phải được start trước khi gửi message
- Kiểm tra execution log trong Apps Script

### API response lỗi
- Kiểm tra URL API có đúng không
- External API có thể đang down
- Rate limiting có thể đang active

### Script chạy chậm
- Giảm số domain kiểm tra cùng lúc
- Tăng timeout cho requests
- Kiểm tra network latency

---

## 📈 Mở rộng tính năng

### Thêm monitoring nâng cao
```javascript
// Kiểm tra certificate chain
function checkCertificateChain(hostname) {
  // Implementation to check full certificate chain
}

// Kiểm tra TLS configuration
function checkTLSConfig(hostname) {
  // Implementation to check TLS settings
}
```

### Integration với các service khác
```javascript
// Gửi thông báo email
function sendEmailAlert(domain, daysRemaining) {
  GmailApp.sendEmail(
    'admin@company.com',
    `SSL Certificate Alert: ${domain}`,
    `Certificate for ${domain} expires in ${daysRemaining} days`
  );
}

// Log vào external service
function logToExternalService(data) {
  // Send to logging service
}
```

### Dashboard và reporting
```javascript
// Tạo summary report
function generateSSLReport() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Domains');
  const data = sheet.getDataRange().getValues();
  
  // Generate summary statistics
  const summary = {
    total: data.length - 1,
    expiringSoon: data.filter(row => row[2] <= 30).length,
    expired: data.filter(row => row[2] <= 0).length
  };
  
  return summary;
}
```

---

## 🔗 Liên kết hữu ích

- [SSL/TLS Best Practices](https://wiki.mozilla.org/Security/Server_Side_TLS)
- [Certificate Transparency Logs](https://www.certificate-transparency.org/)
- [Let's Encrypt Documentation](https://letsencrypt.org/docs/)
- [Google Apps Script Quotas](https://developers.google.com/apps-script/guides/services/quotas)

---

## Ngôn ngữ / Language

- [🇺🇸 English](./README.md)
- [🇻🇳 Tiếng Việt](./README.vi.md)