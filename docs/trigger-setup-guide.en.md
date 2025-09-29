# Google Apps Script Trigger Setup Guide

## Introduction

Triggers are automatic mechanisms that run functions in Google Apps Script based on time or specific events. This is a detailed guide to set up triggers for monitoring scripts.

## Types of Triggers

### 1. Time-based Triggers
- **Specific date and time**: Run once at a specific time
- **Minutes timer**: Run repeatedly by minutes (1, 5, 10, 15, 30 minutes)
- **Hours timer**: Run repeatedly by hours (1, 2, 4, 6, 8, 12 hours)
- **Daily**: Run daily at a fixed time
- **Weekly**: Run weekly on a specific day and time
- **Monthly**: Run monthly

### 2. Event-based Triggers
- **On form submit**: When a form is submitted
- **On spreadsheet edit**: When a spreadsheet is edited
- **On document open**: When a document is opened

## How to Set Up Triggers

### Method 1: Using Apps Script Editor (Recommended)

1. **Open Apps Script Editor**
   - Go to [script.google.com](https://script.google.com)
   - Open your project

2. **Go to Triggers Section**
   - Click the clock icon ⏰ in the left sidebar
   - Or go to **Triggers** → **Manage triggers**

3. **Add New Trigger**
   - Click **+ Add Trigger**
   - Configure settings:
     - **Choose which function to run**: Select function to run (e.g., `checkUrls`, `checkAppVersions`)
     - **Choose which deployment should run**: Select `Head`
     - **Select event source**: Choose `Time-driven`
     - **Select type of time based trigger**: Choose trigger type
     - **Select time interval**: Choose frequency

4. **Save Trigger**
   - Click **Save**
   - Grant permissions if requested

### Method 2: Using Code (Advanced)

```javascript
function createTimeTrigger() {
  // Delete all old triggers (optional)
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(trigger => ScriptApp.deleteTrigger(trigger));
  
  // Create new trigger - run every 5 minutes
  ScriptApp.newTrigger('checkUrls')
    .timeBased()
    .everyMinutes(5)
    .create();
  
  // Or create trigger to run daily at 9:00 AM
  ScriptApp.newTrigger('dailyCheck')
    .timeBased()
    .everyDays(1)
    .atHour(9)
    .create();
    
  console.log('Trigger created successfully!');
}
```

## Recommended Settings for Each Monitor Type

### URL Monitor
- **Recommended frequency**: Every 5-15 minutes
- **Function**: `checkUrls`
- **Reason**: Quick detection of website issues

### App Version Monitor  
- **Recommended frequency**: Every 1-6 hours
- **Function**: `checkAppVersions`
- **Reason**: App versions don't change frequently

### SSL Monitor
- **Recommended frequency**: Daily
- **Function**: `checkSSLCertificates`
- **Reason**: SSL certificates have long validity, daily check is sufficient

## Managing Triggers

### List All Triggers
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

### Delete All Triggers
```javascript
function deleteAllTriggers() {
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(trigger => ScriptApp.deleteTrigger(trigger));
  console.log(`Deleted ${triggers.length} trigger(s)`);
}
```

### Delete Specific Trigger
```javascript
function deleteTriggerByFunction(functionName) {
  const triggers = ScriptApp.getProjectTriggers();
  const toDelete = triggers.filter(trigger => 
    trigger.getHandlerFunction() === functionName
  );
  
  toDelete.forEach(trigger => ScriptApp.deleteTrigger(trigger));
  console.log(`Deleted ${toDelete.length} trigger(s) for function ${functionName}`);
}
```

## Limitations and Notes

### Google Apps Script Limitations
- **Execution time**: Maximum 6 minutes per execution (for triggers)
- **Trigger quota**: Maximum 20 triggers per project
- **Daily executions**: Limited by account type (Gmail: 6 hours/day)

### Best Practices
1. **Don't create too many triggers** - Use 1 trigger for multiple tasks
2. **Handle errors gracefully** - Use try-catch to prevent trigger from stopping
3. **Log activities** - Write logs for debugging and monitoring
4. **Optimize execution time** - Avoid running too long

### Error Handling Example
```javascript
function monitorWithErrorHandling() {
  try {
    // Your main logic
    checkUrls();
    checkAppVersions();
    
  } catch (error) {
    console.error('Error in monitoring:', error);
    
    // Send error notification via Telegram (optional)
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

### Trigger Not Running
1. **Check permissions** - Ensure sufficient permissions granted
2. **Check execution log** - Go to **Executions** to view logs
3. **Verify function name** - Ensure function name is correct
4. **Check quotas** - See if limits are exceeded

### Trigger Runs but Has Errors
1. **View detailed execution log**
2. **Test function manually** before setting up trigger
3. **Add error handling** in code
4. **Check API limits** of external services

## Conclusion

Triggers are powerful tools for automating monitoring tasks. Set them up according to your needs and always monitor execution logs to ensure stable operation.

---

**Useful Links:**
- [Apps Script Triggers Documentation](https://developers.google.com/apps-script/guides/triggers)
- [Apps Script Quotas and Limitations](https://developers.google.com/apps-script/guides/services/quotas)