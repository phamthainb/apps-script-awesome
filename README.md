# Apps Script Awesome

A collection of practical Google Apps Script projects and utilities to automate your workflow and enhance productivity.

## About Google Apps Script

Google Apps Script is a cloud-based JavaScript platform that lets you automate tasks across Google products and third-party services. With Apps Script, you can:

- Automate repetitive tasks in Google Workspace (Sheets, Docs, Gmail, etc.)
- Build custom functions and workflows
- Integrate with external APIs and services
- Create web apps and add-ons

## Available Scripts

### 🌐 [URL Monitor](./URL%20Monitor/)
**Website Uptime Monitor with Telegram Alerts**

A simple yet effective uptime monitoring solution that:
- Monitors website availability from a Google Sheets list
- Checks HTTP status codes periodically 
- Sends instant Telegram notifications when sites go down
- Logs status history with timestamps
- Inspired by [Uptime Kuma](https://github.com/louislam/uptime-kuma)

**Use Cases**: Server monitoring, API health checks, website availability tracking

---

### 📱 [App Version Monitor](./App%20Version%20Monitor/)
**Mobile App Version Tracker with Telegram Alerts**

Monitor app versions on Google Play Store and Apple App Store:
- Tracks multiple apps with country-specific settings
- Monitors both iOS (App Store) and Android (Google Play) apps
- Stores version history, last check time, and release notes in Google Sheets
- Sends instant Telegram notifications when new versions are detected
- Automated monitoring with time-based triggers

**Use Cases**: App release monitoring, competitor analysis, version tracking

---

### 🔒 [SSL Monitor](./SSL%20Monitor/)
**SSL Certificate Expiration Monitor with Telegram Alerts**

Keep track of SSL certificate expiration dates:
- Monitors SSL certificates for multiple domains
- Configurable alert threshold (days before expiration)
- Sends Telegram notifications for expiring certificates
- Tracks detailed SSL certificate information
- Comprehensive error handling and logging

**Use Cases**: SSL certificate management, website security monitoring, proactive maintenance

---

## Getting Started

1. **Choose a Script**: Browse the available scripts above and select one that fits your needs
2. **Follow Setup Instructions**: Each script folder contains detailed README with setup steps
3. **Create Google Apps Script Project**: 
   - Go to [script.google.com](https://script.google.com)
   - Create a new project
   - Copy the code from the chosen script
4. **Configure & Deploy**: Follow the specific configuration steps for your selected script

## 📖 Setup Guides

### Essential Setup Instructions
- **🔧 Trigger Setup Guide**: 
  - [🇺🇸 English](./docs/trigger-setup-guide.en.md) | [🇻🇳 Tiếng Việt](./docs/trigger-setup-guide.vi.md)
  - Comprehensive guide to setting up automated triggers for your monitoring scripts
- **🤖 Telegram Bot Setup**: 
  - [🇺🇸 English](./docs/telegram-bot-setup.en.md) | [🇻🇳 Tiếng Việt](./docs/telegram-bot-setup.vi.md)
  - Step-by-step instructions to create a Telegram bot and get Chat ID for notifications

### Quick Setup Checklist
1. ✅ Create Telegram bot and get bot token
2. ✅ Get your Telegram Chat ID  
3. ✅ Set up Google Apps Script project
4. ✅ Configure trigger for automated monitoring
5. ✅ Test notifications

## Requirements

- Google account (for Apps Script)
- Basic understanding of JavaScript (for customizations)
- Access to relevant Google services (Sheets, Gmail, etc.) depending on the script

## Contributing

Feel free to submit issues, fork the repository, and create pull requests for any improvements.

## License

This project is open source and available under the [MIT License](LICENSE).

---

## Language / Ngôn Ngữ

- [🇺🇸 English](./README.md)
- [🇻🇳 Tiếng Việt](./README.vi.md)
