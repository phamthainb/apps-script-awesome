# Telegram Bot Creation and Chat ID Setup Guide

## Introduction

Telegram bots are an excellent way to receive automatic notifications from monitoring scripts. This guide will help you create a Telegram bot and get the Chat ID for use in Apps Script.

## Step 1: Create Telegram Bot

### 1.1. Find BotFather
1. Open Telegram app
2. Search for `@BotFather` or click [here](https://t.me/botfather)
3. Start chatting with BotFather

### 1.2. Create New Bot
1. Send command `/newbot` to BotFather
2. BotFather will ask for your bot name
3. Enter bot name (e.g., "My Monitoring Bot")
4. BotFather will ask for bot username
5. Enter username (must end with "bot", e.g., "my_monitoring_bot")

### 1.3. Get Bot Token
After successful creation, BotFather will send you:
- **Bot Token**: Format like `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`
- **Bot Link**: `https://t.me/your_bot_username`

⚠️ **NOTE**: Keep Bot Token secure, this is your bot's "password"!

## Step 2: Get Chat ID

### Method 1: Using @userinfobot (Easiest)

1. Find and chat with `@userinfobot`
2. Send any message
3. Bot will return your information, including **Chat ID**

### Method 2: Using Telegram API

1. **Send message to your bot**
   - Find bot by username (e.g., @my_monitoring_bot)
   - Send `/start` command or any message

2. **Call getUpdates API**
   - Open browser and access:
   ```
   https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates
   ```
   - Replace `<YOUR_BOT_TOKEN>` with your actual bot token

3. **Find Chat ID in response**
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
             "id": 987654321,  // ← This is Chat ID
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

### Method 3: Using @getidsbot

1. Find and chat with `@getidsbot`
2. Forward a message from the chat you want to get ID for
3. Bot will return Chat ID

## Step 3: Test Bot and Chat ID

### 3.1. Test with Browser
Access the following URL to test sending message:
```
https://api.telegram.org/bot<YOUR_BOT_TOKEN>/sendMessage?chat_id=<YOUR_CHAT_ID>&text=Hello from my bot!
```

### 3.2. Test with Apps Script
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

## Step 4: Configure Bot (Optional)

### 4.1. Set Bot Description
```
/setdescription
```
Enter description for bot (displayed when users view bot profile)

### 4.2. Set Bot Commands
```
/setcommands
```
Set commands for bot:
```
start - Start using the bot
help - Show help
status - Check monitoring status
```

### 4.3. Set Bot Profile Picture
```
/setuserpic
```
Upload profile picture for bot

## Step 5: Use in Apps Script

### 5.1. Configure in Script
```javascript
// Add at the beginning of Code.gs file
const TELEGRAM_BOT_TOKEN = 'YOUR_BOT_TOKEN';
const TELEGRAM_CHAT_ID = 'YOUR_CHAT_ID';

// Function to send notification
function sendAlert(message) {
  sendTelegramMessage(message, TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID);
}
```

### 5.2. Use in Monitoring Scripts
```javascript
// Example in URL Monitor
function checkUrls() {
  // ... URL checking logic
  
  if (websiteDown) {
    sendAlert(`🚨 Website ${url} is DOWN! Status: ${statusCode}`);
  }
  
  if (websiteBackUp) {
    sendAlert(`✅ Website ${url} is back UP!`);
  }
}
```

## Step 6: Advanced Features

### 6.1. Group Chat
To use bot in group:
1. Add bot to group
2. Get Group Chat ID (will be negative number, e.g., -123456789)
3. Grant admin rights to bot if needed

### 6.2. Channel
To send messages to channel:
1. Add bot to channel with post permission
2. Use Channel ID (starts with @, e.g., @mychannel)

### 6.3. Rich Text Formatting
```javascript
// Using HTML formatting
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
  
  // ... send request
}
```

## Troubleshooting

### Bot Cannot Send Messages
1. **Check Bot Token** - Ensure token is correct
2. **Check Chat ID** - Ensure Chat ID is in correct format
3. **Bot not started** - Send `/start` to bot first
4. **API Limits** - Telegram has limit of 30 messages/second

### Wrong Chat ID
1. **Private chat**: Chat ID is positive number
2. **Group chat**: Chat ID is negative number
3. **Channel**: Chat ID starts with @ or negative number

### 403 Forbidden Error
- Bot not started by user
- Bot blocked by user
- Bot doesn't have permission in group/channel

## Best Practices

### Security
1. **Don't commit Bot Token** to Git
2. **Use PropertiesService** to store credentials
3. **Limit bot permissions** to only necessary

### Code Organization
```javascript
// Store credentials securely
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
// Create message template
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

## Conclusion

Integrating Telegram bot into Apps Script monitoring system brings many benefits:
- Receive real-time notifications
- No email needed, avoid spam
- Can interact with bot
- Easy to share notifications in team

---

**Useful Links:**
- [Telegram Bot API Documentation](https://core.telegram.org/bots/api)
- [BotFather Commands](https://core.telegram.org/bots#6-botfather)
- [Telegram Bot Tutorial](https://core.telegram.org/bots/tutorial)