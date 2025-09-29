# SSL Monitor

This Google Apps Script monitors SSL certificates for multiple domains and sends Telegram alerts when certificates are about to expire.

## Features

- Monitors SSL certificates for multiple domains
- Configurable alert threshold (days before expiration)
- Telegram notifications for expiring certificates
- Detailed SSL certificate information tracking
- Error handling and logging

## Setup

1. **Create a Google Spreadsheet** with a sheet named "Domains"

2. **Run the `setupSheet()` function** to create the proper headers:
   - Domain
   - Alert Days
   - Days Remaining
   - Expires
   - Issuer
   - Last Check

3. **Configure your Telegram bot**:
   - Replace `YOUR_TELEGRAM_BOT_TOKEN` with your actual bot token
   - Replace `YOUR_CHAT_ID` with your chat ID

4. **Add domains to monitor**:
   - Column A: Domain name (e.g., `vnpt.com.vn`)
   - Column B: Alert days (optional, defaults to 30 days)

## Usage

### Manual Check
Run the `checkSSL()` function to check all domains immediately.

### Automated Monitoring
Set up a time-driven trigger to run `checkSSL()` automatically:
1. Go to Apps Script Editor → Triggers
2. Add trigger for `checkSSL` function
3. Choose time-based trigger (e.g., daily)

## API Response

The script uses the SSL checker API: `https://ssl-checker-production-cc05.up.railway.app/check?host=DOMAIN`

Example response:
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
    "tls": { /* TLS configuration details */ },
    "node": { /* Node.js environment info */ }
  }
}
```

## Self-Hosting SSL Checker API

For better reliability and control, you can self-host the SSL checker API using the open-source repository: [https://github.com/phamthai072/ssl-checker](https://github.com/phamthai072/ssl-checker)

### Quick Deploy Options

#### 1. Deploy to Railway
[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/VE3HTF)

1. Click the Railway deploy button
2. Connect your GitHub account
3. Deploy the service
4. Get your Railway app URL (e.g., `https://your-app.railway.app`)
5. Update the `SSL_CHECKER_API` constant in your code:
   ```javascript
   const SSL_CHECKER_API = 'https://your-app.railway.app/check';
   ```

#### 2. Deploy to Heroku
1. Clone the repository:
   ```bash
   git clone https://github.com/phamthai072/ssl-checker.git
   cd ssl-checker
   ```
2. Create a Heroku app:
   ```bash
   heroku create your-ssl-checker
   ```
3. Deploy:
   ```bash
   git push heroku main
   ```
4. Update your `SSL_CHECKER_API` constant with your Heroku URL

#### 3. Deploy to Vercel
1. Fork the repository: [https://github.com/phamthai072/ssl-checker](https://github.com/phamthai072/ssl-checker)
2. Import to Vercel from your GitHub
3. Deploy with default settings
4. Update your `SSL_CHECKER_API` constant with your Vercel URL

#### 4. Docker Deployment
1. Clone and build:
   ```bash
   git clone https://github.com/phamthai072/ssl-checker.git
   cd ssl-checker
   docker build -t ssl-checker .
   docker run -p 3000:3000 ssl-checker
   ```
2. Access at `http://localhost:3000`

#### 5. Local Development
1. Clone the repository:
   ```bash
   git clone https://github.com/phamthai072/ssl-checker.git
   cd ssl-checker
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```
4. Access at `http://localhost:3000`
5. For local testing, update the constant:
   ```javascript
   const SSL_CHECKER_API = 'http://localhost:3000/check';
   ```

### Benefits of Self-Hosting

- **Reliability**: No dependency on external services
- **Privacy**: SSL checks happen on your own infrastructure
- **Customization**: Modify the API to suit your specific needs
- **Rate Limits**: Control your own rate limiting
- **Uptime**: Better control over service availability

### Configuration After Self-Hosting

After deploying your own SSL checker API, update the configuration in your Google Apps Script:

```javascript
const SSL_CHECKER_API = 'https://your-domain.com/check'; // Your self-hosted API
```

The API endpoint should respond to GET requests at `/check?host=DOMAIN` and return the same JSON structure as shown in the API Response section above.

## Functions

- `checkSSL()` - Main function to check all domains
- `setupSheet()` - Initialize spreadsheet with proper headers
- `getSSLDetails(hostname)` - Get SSL details for a specific domain
- `sendTelegram(text)` - Send notification to Telegram

## Configuration

- `SSL_ALERT_DAYS`: Default number of days before expiration to trigger alerts (30 days)
- Individual domains can have custom alert thresholds in column B

## Alerts

The script sends Telegram alerts when:
- SSL certificate expires within the configured days
- SSL check fails or encounters an error

Alert messages include:
- Domain name
- Days remaining until expiration
- Expiration date
- Certificate issuer