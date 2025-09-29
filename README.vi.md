# Apps Script Awesome

Bộ sưu tập các dự án và tiện ích Google Apps Script thực tế để tự động hóa quy trình làm việc và nâng cao năng suất.

## Về Google Apps Script

Google Apps Script là nền tảng JavaScript dựa trên cloud cho phép bạn tự động hóa các tác vụ trên các sản phẩm Google và dịch vụ bên thứ ba. Với Apps Script, bạn có thể:

- Tự động hóa các tác vụ lặp đi lặp lại trong Google Workspace (Sheets, Docs, Gmail, v.v.)
- Xây dựng các hàm và quy trình làm việc tùy chỉnh
- Tích hợp với các API và dịch vụ bên ngoài
- Tạo ứng dụng web và add-on

## Các Script Có Sẵn

### 🌐 [URL Monitor](./URL%20Monitor/)
**Giám Sát Uptime Website với Cảnh Báo Telegram**

Giải pháp giám sát uptime đơn giản nhưng hiệu quả:
- Giám sát tính khả dụng của website từ danh sách Google Sheets
- Kiểm tra mã trạng thái HTTP định kỳ
- Gửi thông báo Telegram ngay lập tức khi website gặp sự cố
- Ghi log lịch sử trạng thái với timestamp
- Lấy cảm hứng từ [Uptime Kuma](https://github.com/louislam/uptime-kuma)

**Trường hợp sử dụng**: Giám sát server, kiểm tra sức khỏe API, theo dõi tính khả dụng website

---

### 📱 [App Version Monitor](./App%20Version%20Monitor/)
**Theo Dõi Phiên Bản Ứng Dụng Mobile với Cảnh Báo Telegram**

Giám sát phiên bản ứng dụng trên Google Play Store và Apple App Store:
- Theo dõi nhiều ứng dụng với cài đặt theo quốc gia
- Giám sát cả ứng dụng iOS (App Store) và Android (Google Play)
- Lưu trữ lịch sử phiên bản, thời gian kiểm tra cuối cùng và ghi chú phát hành trong Google Sheets
- Gửi thông báo Telegram ngay lập tức khi phát hiện phiên bản mới
- Giám sát tự động với trigger theo thời gian

**Trường hợp sử dụng**: Giám sát phát hành ứng dụng, phân tích đối thủ, theo dõi phiên bản

---

### 🔒 [SSL Monitor](./SSL%20Monitor/)
**Giám Sát Hết Hạn Chứng Chỉ SSL với Cảnh Báo Telegram**

Theo dõi ngày hết hạn chứng chỉ SSL:
- Giám sát chứng chỉ SSL cho nhiều domain
- Ngưỡng cảnh báo có thể cấu hình (số ngày trước khi hết hạn)
- Gửi thông báo Telegram cho chứng chỉ sắp hết hạn
- Theo dõi thông tin chi tiết chứng chỉ SSL
- Xử lý lỗi và ghi log toàn diện

**Trường hợp sử dụng**: Quản lý chứng chỉ SSL, giám sát bảo mật website, bảo trì chủ động

---

## Bắt Đầu

1. **Chọn Script**: Duyệt qua các script có sẵn ở trên và chọn một script phù hợp với nhu cầu của bạn
2. **Làm theo Hướng Dẫn Thiết Lập**: Mỗi thư mục script chứa README chi tiết với các bước thiết lập
3. **Tạo Dự Án Google Apps Script**: 
   - Truy cập [script.google.com](https://script.google.com)
   - Tạo dự án mới
   - Sao chép code từ script đã chọn
4. **Cấu Hình & Triển Khai**: Làm theo các bước cấu hình cụ thể cho script đã chọn

## 📖 Hướng Dẫn Thiết Lập

### Hướng Dẫn Thiết Lập Cơ Bản
- **🔧 Hướng Dẫn Thiết Lập Trigger**: 
  - [🇺🇸 English](./docs/trigger-setup-guide.en.md) | [🇻🇳 Tiếng Việt](./docs/trigger-setup-guide.vi.md)
  - Hướng dẫn toàn diện để thiết lập trigger tự động cho các script giám sát
- **🤖 Thiết Lập Bot Telegram**: 
  - [🇺🇸 English](./docs/telegram-bot-setup.en.md) | [🇻🇳 Tiếng Việt](./docs/telegram-bot-setup.vi.md)
  - Hướng dẫn từng bước để tạo bot Telegram và lấy Chat ID cho thông báo

### Danh Sách Kiểm Tra Thiết Lập Nhanh
1. ✅ Tạo bot Telegram và lấy bot token
2. ✅ Lấy Chat ID Telegram của bạn
3. ✅ Thiết lập dự án Google Apps Script
4. ✅ Cấu hình trigger cho giám sát tự động
5. ✅ Test thông báo

## Yêu Cầu

- Tài khoản Google (cho Apps Script)
- Hiểu biết cơ bản về JavaScript (cho tùy chỉnh)
- Quyền truy cập vào các dịch vụ Google liên quan (Sheets, Gmail, v.v.) tùy thuộc vào script

## Đóng Góp

Hãy thoải mái gửi issues, fork repository và tạo pull requests cho bất kỳ cải tiến nào.

## Giấy Phép

Dự án này là mã nguồn mở và có sẵn dưới [Giấy phép MIT](LICENSE).

---

## Language / Ngôn Ngữ

- [🇺🇸 English](./README.md)
- [🇻🇳 Tiếng Việt](./README.vi.md)