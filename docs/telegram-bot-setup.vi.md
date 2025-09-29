# Hướng dẫn Tạo Bot Telegram và Lấy Chat ID

## Giới thiệu

Bot Telegram là cách tuyệt vời để nhận thông báo tự động từ các script monitoring. Hướng dẫn này sẽ giúp bạn tạo bot Telegram và lấy Chat ID để sử dụng trong các script Apps Script.

## Bước 1: Tạo Bot Telegram

### 1.1. Tìm BotFather
1. Mở ứng dụng Telegram
2. Tìm kiếm `@BotFather` hoặc click [đây](https://t.me/botfather)
3. Bắt đầu chat với BotFather

### 1.2. Tạo Bot mới
1. Gửi lệnh `/newbot` cho BotFather
2. BotFather sẽ hỏi tên bot của bạn
3. Nhập tên bot (ví dụ: "My Monitoring Bot")
4. BotFather sẽ hỏi username cho bot
5. Nhập username (phải kết thúc bằng "bot", ví dụ: "my_monitoring_bot")

### 1.3. Lấy Bot Token
Sau khi tạo thành công, BotFather sẽ gửi cho bạn:
- **Bot Token**: Dạng `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`
- **Link đến bot**: `https://t.me/your_bot_username`

⚠️ **LƯU Ý**: Giữ Bot Token an toàn, đây là "mật khẩu" của bot!

## Bước 2: Lấy Chat ID

### Phương pháp 1: Sử dụng Bot @userinfobot (Dễ nhất)

1. Tìm và chat với `@userinfobot`
2. Gửi bất kỳ tin nhắn nào
3. Bot sẽ trả về thông tin của bạn, bao gồm **Chat ID**

### Phương pháp 2: Sử dụng API Telegram

1. **Gửi tin nhắn cho bot của bạn**
   - Tìm bot bằng username (ví dụ: @my_monitoring_bot)
   - Gửi lệnh `/start` hoặc bất kỳ tin nhắn nào

2. **Gọi API getUpdates**
   - Mở trình duyệt và truy cập:
   ```
   https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates
   ```
   - Thay `<YOUR_BOT_TOKEN>` bằng token thực của bot

3. **Tìm Chat ID trong response**
   ```json
   {
     "ok": true,
     "result": [
       {
         "update_id": 123456789,
         "message": {
           "message_id": 1,
           "from": {
             "id": 987654321,
             "is_bot": false,
             "first_name": "Your Name"
           },
           "chat": {
             "id": 987654321,  // ← Đây là Chat ID
             "first_name": "Your Name",
             "type": "private"
           },
           "date": 1234567890,
           "text": "/start"
         }
       }
     ]
   }
   ```

### Phương pháp 3: Sử dụng Bot @getidsbot

1. Tìm và chat với `@getidsbot`
2. Forward (chuyển tiếp) một tin nhắn từ chat mà bạn muốn lấy ID
3. Bot sẽ trả về Chat ID

## Bước 3: Test Bot và Chat ID

### 3.1. Test bằng Browser
Truy cập URL sau để test gửi tin nhắn:
```
https://api.telegram.org/bot<YOUR_BOT_TOKEN>/sendMessage?chat_id=<YOUR_CHAT_ID>&text=Hello from my bot!
```

### 3.2. Test bằng Apps Script
```javascript
function testTelegramBot() {
  const botToken = 'YOUR_BOT_TOKEN';
  const chatId = 'YOUR_CHAT_ID';
  const message = '🧪 Test message from Apps Script!';
  
  const result = sendTelegramMessage(message, botToken, chatId);
  console.log('Test result:', result);
}

function sendTelegramMessage(message, token, chatId) {
  try {
    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    const payload = {
      'chat_id': chatId,
      'text': message,
      'parse_mode': 'HTML'
    };
    
    const options = {
      'method': 'POST',
      'headers': {
        'Content-Type': 'application/json',
      },
      'payload': JSON.stringify(payload)
    };
    
    const response = UrlFetchApp.fetch(url, options);
    const responseText = response.getContentText();
    const responseJson = JSON.parse(responseText);
    
    if (responseJson.ok) {
      console.log('Message sent successfully');
      return true;
    } else {
      console.error('Failed to send message:', responseJson.description);
      return false;
    }
  } catch (error) {
    console.error('Error sending Telegram message:', error);
    return false;
  }
}
```

## Bước 4: Cấu hình Bot (Tùy chọn)

### 4.1. Thiết lập Bot Description
```
/setdescription
```
Nhập mô tả cho bot (hiển thị khi người dùng xem profile bot)

### 4.2. Thiết lập Bot Commands
```
/setcommands
```
Thiết lập các lệnh cho bot:
```
start - Bắt đầu sử dụng bot
help - Hiển thị trợ giúp
status - Kiểm tra trạng thái monitoring
```

### 4.3. Thiết lập Bot Profile Picture
```
/setuserpic
```
Upload ảnh đại diện cho bot

## Bước 5: Sử dụng trong Apps Script

### 5.1. Cấu hình trong Script
```javascript
// Thêm vào đầu file Code.gs
const TELEGRAM_BOT_TOKEN = 'YOUR_BOT_TOKEN';
const TELEGRAM_CHAT_ID = 'YOUR_CHAT_ID';

// Function gửi thông báo
function sendAlert(message) {
  sendTelegramMessage(message, TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID);
}
```

### 5.2. Sử dụng trong Monitoring Scripts
```javascript
// Ví dụ trong URL Monitor
function checkUrls() {
  // ... logic check URLs
  
  if (websiteDown) {
    sendAlert(`🚨 Website ${url} is DOWN! Status: ${statusCode}`);
  }
  
  if (websiteBackUp) {
    sendAlert(`✅ Website ${url} is back UP!`);
  }
}
```

## Bước 6: Tính năng nâng cao

### 6.1. Group Chat
Để sử dụng bot trong group:
1. Thêm bot vào group
2. Lấy Group Chat ID (sẽ là số âm, ví dụ: -123456789)
3. Cấp quyền admin cho bot nếu cần

### 6.2. Channel
Để gửi tin nhắn đến channel:
1. Thêm bot vào channel với quyền post
2. Sử dụng Channel ID (bắt đầu với @, ví dụ: @mychannel)

### 6.3. Rich Text Formatting
```javascript
// Sử dụng HTML formatting
const message = `
<b>🚨 ALERT</b>
<i>Website Monitor</i>

URL: <code>${url}</code>
Status: <b>${status}</b>
Time: ${new Date().toLocaleString()}
`;

sendTelegramMessage(message, token, chatId);
```

### 6.4. Inline Keyboards
```javascript
function sendMessageWithButton(text, token, chatId) {
  const url = `https://api.telegram.org/bot${token}/sendMessage`;
  const keyboard = {
    'inline_keyboard': [[
      {
        'text': '🔄 Check Again',
        'url': 'https://script.google.com/macros/d/YOUR_SCRIPT_ID/exec'
      }
    ]]
  };
  
  const payload = {
    'chat_id': chatId,
    'text': text,
    'parse_mode': 'HTML',
    'reply_markup': JSON.stringify(keyboard)
  };
  
  // ... gửi request
}
```

## Troubleshooting

### Bot không gửi được tin nhắn
1. **Kiểm tra Bot Token** - Đảm bảo token chính xác
2. **Kiểm tra Chat ID** - Đảm bảo Chat ID đúng định dạng
3. **Bot chưa được start** - Gửi `/start` cho bot trước
4. **API Limits** - Telegram có giới hạn 30 tin nhắn/giây

### Chat ID không đúng
1. **Private chat**: Chat ID là số dương
2. **Group chat**: Chat ID là số âm
3. **Channel**: Chat ID bắt đầu với @ hoặc số âm

### Lỗi 403 Forbidden
- Bot chưa được start bởi user
- Bot bị block bởi user
- Bot không có quyền trong group/channel

## Best Practices

### Security
1. **Không commit Bot Token** vào Git
2. **Sử dụng PropertiesService** để lưu trữ credentials
3. **Giới hạn quyền bot** chỉ cần thiết

### Code Organization
```javascript
// Lưu credentials an toàn
function setTelegramCredentials() {
  const properties = PropertiesService.getScriptProperties();
  properties.setProperties({
    'TELEGRAM_BOT_TOKEN': 'your_bot_token',
    'TELEGRAM_CHAT_ID': 'your_chat_id'
  });
}

function getTelegramCredentials() {
  const properties = PropertiesService.getScriptProperties();
  return {
    token: properties.getProperty('TELEGRAM_BOT_TOKEN'),
    chatId: properties.getProperty('TELEGRAM_CHAT_ID')
  };
}
```

### Message Formatting
```javascript
// Tạo message template
function createAlertMessage(type, details) {
  const icons = {
    'error': '🚨',
    'warning': '⚠️',
    'success': '✅',
    'info': 'ℹ️'
  };
  
  return `
${icons[type]} <b>${type.toUpperCase()}</b>
<i>${new Date().toLocaleString()}</i>

${details}
  `;
}
```

## Kết luận

Việc tích hợp Telegram bot vào Apps Script monitoring system mang lại nhiều lợi ích:
- Nhận thông báo real-time
- Không cần email, tránh spam
- Có thể tương tác với bot
- Dễ dàng chia sẻ thông báo trong team

---

**Liên kết hữu ích:**
- [Telegram Bot API Documentation](https://core.telegram.org/bots/api)
- [BotFather Commands](https://core.telegram.org/bots#6-botfather)
- [Telegram Bot Tutorial](https://core.telegram.org/bots/tutorial)