# Textbelt Backend Server

A Node.js backend server that provides an SMS API similar to Textbelt, with Twilio integration for real SMS sending.

## Features

- SMS sending via Twilio API
- Rate limiting and security headers
- Input validation
- Demo mode (simulates SMS sending without real Twilio credentials)
- Quota management for free tier
- Message status tracking

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Environment configuration:**
   - Copy `env.example` to `.env`
   - Fill in your Twilio credentials (optional)
   - Set your desired PORT (defaults to 3000)

3. **Run the server:**
   ```bash
   # Production
   npm start
   
   # Development (with auto-restart)
   npm run dev
   ```

## API Endpoints

- `GET /` - Health check and API info
- `POST /text` - Send SMS
- `GET /status/:textId` - Check message status
- `GET /quota` - Check remaining quota
- `GET /regions` - Supported regions

## SMS Sending

### Request Body:
```json
{
  "phone": "+1234567890",
  "message": "Hello from Textbelt!",
  "key": "textbelt" // optional
}
```

### Response:
```json
{
  "success": true,
  "textId": "abc123",
  "quotaRemaining": 0
}
```

## Demo Mode

If no Twilio credentials are configured, the server runs in demo mode:
- Simulates SMS sending
- No real messages are sent
- Useful for testing and development

## Security Features

- Rate limiting (100 requests per 15 minutes, 10 SMS per hour)
- Helmet security headers
- CORS enabled
- Input validation
- IP-based quota tracking

## Dependencies

- Express.js - Web framework
- Twilio - SMS service
- Helmet - Security headers
- Express-rate-limit - Rate limiting
- Express-validator - Input validation
- CORS - Cross-origin support
- Dotenv - Environment variables
