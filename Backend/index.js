const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const { body, validationResult } = require('express-validator');
const twilio = require('twilio');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

// SMS rate limiting (more restrictive)
const smsLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // limit each IP to 10 SMS per hour
  message: 'SMS rate limit exceeded. Please try again later.'
});

// Twilio configuration - initialize only when needed
let twilioClient = null;

const initializeTwilio = () => {
  if (!twilioClient && process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
    try {
      twilioClient = twilio(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_AUTH_TOKEN
      );
    } catch (error) {
      console.error('Failed to initialize Twilio client:', error.message);
      twilioClient = null;
    }
  }
  return twilioClient;
};

// In-memory storage for demo purposes (use a database in production)
const messageLog = [];
const quotaUsage = new Map();

// Helper functions
const validatePhoneNumber = (phone) => {
  // Basic phone number validation (international format)
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;
  return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
};

const normalizePhoneNumber = (phone) => {
  // Remove all non-digit characters except +
  let normalized = phone.replace(/[^\d+]/g, '');
  
  // Add + if not present and doesn't start with country code
  if (!normalized.startsWith('+')) {
    // Assume US number if no country code
    if (normalized.length === 10) {
      normalized = '+1' + normalized;
    } else if (normalized.length === 11 && normalized.startsWith('1')) {
      normalized = '+' + normalized;
    } else {
      normalized = '+' + normalized;
    }
  }
  
  return normalized;
};

const checkQuota = (ip) => {
  const usage = quotaUsage.get(ip) || { count: 0, resetTime: Date.now() + 24 * 60 * 60 * 1000 };
  
  // Reset quota if 24 hours have passed
  if (Date.now() > usage.resetTime) {
    usage.count = 0;
    usage.resetTime = Date.now() + 24 * 60 * 60 * 1000;
  }
  
  quotaUsage.set(ip, usage);
  return usage;
};

// Routes

// Health check
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Textbelt API Server is running',
    version: '1.0.0',
    endpoints: {
      send: 'POST /text',
      status: 'GET /status/:textId',
      quota: 'GET /quota'
    }
  });
});

// Send SMS
app.post('/text', 
  smsLimiter,
  [
    body('phone')
      .notEmpty()
      .withMessage('Phone number is required')
      .custom((value) => {
        if (!validatePhoneNumber(value)) {
          throw new Error('Invalid phone number format');
        }
        return true;
      }),
    body('message')
      .notEmpty()
      .withMessage('Message is required')
      .isLength({ min: 1, max: 1600 })
      .withMessage('Message must be between 1 and 1600 characters'),
    body('key')
      .optional()
      .isString()
      .withMessage('API key must be a string')
  ],
  async (req, res) => {
    try {
      // Validate input
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          error: 'Validation failed',
          details: errors.array()
        });
      }

      const { phone, message, key } = req.body;
      const clientIp = req.ip || req.connection.remoteAddress;

      // Check quota for free tier (if no API key provided)
      if (!key || key === 'textbelt') {
        const quota = checkQuota(clientIp);
        const freeLimit = 1; // 1 free SMS per day per IP
        
        if (quota.count >= freeLimit) {
          return res.status(429).json({
            success: false,
            error: 'Free quota exceeded',
            quotaRemaining: 0
          });
        }
      }

      // Normalize phone number
      const normalizedPhone = normalizePhoneNumber(phone);

      // Generate unique message ID
      const textId = Math.random().toString(36).substring(2, 15);
      
      // Log message attempt
      const messageRecord = {
        textId,
        phone: normalizedPhone,
        message: message.substring(0, 100) + (message.length > 100 ? '...' : ''), // Truncate for logging
        timestamp: new Date().toISOString(),
        ip: clientIp,
        status: 'pending'
      };
      
      messageLog.push(messageRecord);

      // Send via Twilio (if configured and valid)
      const hasTwilioConfig = process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN && process.env.TWILIO_FROM_NUMBER;
      
      if (hasTwilioConfig) {
        try {
          const client = initializeTwilio();
          if (!client) {
            throw new Error('Failed to initialize Twilio client');
          }
          
          const twilioMessage = await client.messages.create({
            body: message,
            from: process.env.TWILIO_FROM_NUMBER,
            to: normalizedPhone
          });
          
          messageRecord.status = 'sent';
          messageRecord.twilioSid = twilioMessage.sid;
          
          // Update quota if using free tier
          if (!key || key === 'textbelt') {
            const quota = quotaUsage.get(clientIp);
            quota.count++;
            quotaUsage.set(clientIp, quota);
          }

          res.json({
            success: true,
            textId,
            quotaRemaining: (!key || key === 'textbelt') ? Math.max(0, 1 - quotaUsage.get(clientIp).count) : 'unlimited'
          });

        } catch (twilioError) {
          messageRecord.status = 'failed';
          messageRecord.error = twilioError.message;
          
          res.status(400).json({
            success: false,
            error: 'Failed to send SMS',
            textId,
            details: twilioError.message
          });
        }
      } else {
        // Demo mode - simulate sending
        setTimeout(() => {
          messageRecord.status = 'sent';
        }, 1000);

        // Update quota if using free tier
        if (!key || key === 'textbelt') {
          const quota = quotaUsage.get(clientIp);
          quota.count++;
          quotaUsage.set(clientIp, quota);
        }

        res.json({
          success: true,
          textId,
          quotaRemaining: (!key || key === 'textbelt') ? Math.max(0, 1 - quotaUsage.get(clientIp).count) : 'unlimited',
          note: 'Demo mode - SMS simulated successfully. To send real SMS: 1) Buy a Twilio phone number, 2) Update TWILIO_FROM_NUMBER in .env file, 3) Restart server.'
        });
      }

    } catch (error) {
      console.error('Error sending SMS:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }
);

// Check message status
app.get('/status/:textId', (req, res) => {
  const { textId } = req.params;
  
  const message = messageLog.find(msg => msg.textId === textId);
  
  if (!message) {
    return res.status(404).json({
      success: false,
      error: 'Message not found'
    });
  }

  res.json({
    success: true,
    textId,
    status: message.status,
    timestamp: message.timestamp
  });
});

// Check quota
app.get('/quota', (req, res) => {
  const clientIp = req.ip || req.connection.remoteAddress;
  const quota = checkQuota(clientIp);
  const freeLimit = 1;
  
  res.json({
    success: true,
    quotaRemaining: Math.max(0, freeLimit - quota.count),
    resetTime: new Date(quota.resetTime).toISOString()
  });
});

// Get supported regions (for compatibility with original Textbelt)
app.get('/regions', (req, res) => {
  res.json([
    'us',
    'canada',
    'intl'
  ]);
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Textbelt server running on port ${PORT}`);
  console.log('Endpoints:');
  console.log(`  POST http://localhost:${PORT}/text - Send SMS`);
  console.log(`  GET  http://localhost:${PORT}/status/:textId - Check status`);
  console.log(`  GET  http://localhost:${PORT}/quota - Check quota`);
  console.log(`  GET  http://localhost:${PORT}/regions - Supported regions`);
  
  if (!process.env.TWILIO_ACCOUNT_SID) {
    console.log('\nNote: Running in demo mode. Set Twilio credentials to send real SMS.');
  }
});

module.exports = app;