# Rate Limiting Implementation

This document describes the rate limiting implementation added to address the CodeQL security alert for missing rate limiting.

## Overview

Rate limiting has been implemented using the `express-rate-limit` middleware to protect various endpoints from abuse and ensure fair usage of API resources.

## Rate Limiting Configurations

The following rate limiting configurations are available in `/middleware/rateLimitMiddleware.js`:

### 1. General Rate Limit
- **Window**: 15 minutes
- **Limit**: 100 requests per IP
- **Applied to**: All API endpoints as a baseline

### 2. Authentication Rate Limit
- **Window**: 15 minutes  
- **Limit**: 5 attempts per IP
- **Applied to**: Login, signup, Google auth endpoints
- **Special**: Skips counting successful requests

### 3. OTP Rate Limit
- **Window**: 5 minutes
- **Limit**: 3 requests per IP
- **Applied to**: OTP verification endpoints

### 4. AI Rate Limit
- **Window**: 1 minute
- **Limit**: 10 requests per IP
- **Applied to**: AI/Gemini endpoints (resource-intensive operations)

### 5. Content Rate Limit
- **Window**: 10 minutes
- **Limit**: 30 requests per IP
- **Applied to**: Content creation endpoints (questions, answers, notes, reviews)

### 6. Feedback Rate Limit
- **Window**: 1 hour
- **Limit**: 5 requests per IP
- **Applied to**: Feedback submission endpoints

### 7. Read Rate Limit
- **Window**: 15 minutes
- **Limit**: 300 requests per IP
- **Applied to**: Read-only endpoints (more permissive)

## Applied Rate Limits by Route

### Authentication Routes (`/routes/userRoutes.js`)
- `/auth/signup` - Auth Rate Limit (5/15min)
- `/auth/login` - Auth Rate Limit (5/15min)
- `/auth/google` - Auth Rate Limit (5/15min)
- `/auth/verify-otp` - OTP Rate Limit (3/5min)
- `/feedback` - Feedback Rate Limit (5/hour)
- `/user/streak` - Read Rate Limit (300/15min)
- `/latest-news` - Read Rate Limit (300/15min)

### AI Routes (`/routes/aiRoutes.js`)
- `/gemini` - AI Rate Limit (10/1min)

### Community Routes (`/routes/communityRoutes.js`)
- `POST /questions` - Content Rate Limit (30/10min)
- `GET /questions` - Read Rate Limit (300/15min)
- `POST /questions/:id/answers` - Content Rate Limit (30/10min)
- `GET /questions/:id/answers` - Read Rate Limit (300/15min)

### Hackathon Routes (`/routes/hackathonRoutes.js`)
- `GET /` - Read Rate Limit (300/15min)
- `GET /:id` - Read Rate Limit (300/15min)
- `POST /:id/register` - Content Rate Limit (30/10min)
- `POST /:id/create-team` - Content Rate Limit (30/10min)
- `POST /:id/join-team` - Content Rate Limit (30/10min)
- `POST /:id/submit` - Content Rate Limit (30/10min)
- `GET /:id/leaderboard` - Read Rate Limit (300/15min)
- `POST /vote` - Content Rate Limit (30/10min)
- `POST /unvote` - Content Rate Limit (30/10min)

### Placement Routes (`/routes/placementRoutes.js`)
- All GET endpoints - Read Rate Limit (300/15min)

### Java Learning Routes (`/routes/javaRoutes.js`)
- `GET /` - Read Rate Limit (300/15min)
- `GET /:moduleId` - Read Rate Limit (300/15min)
- `POST /notes/:topicId` - Content Rate Limit (30/10min)
- `POST /reviews/:topicId` - Content Rate Limit (30/10min)
- `PATCH /progress/:topicId` - Content Rate Limit (30/10min)

## Response Headers

Rate limit information is included in response headers:
- `RateLimit-Limit`: Maximum number of requests allowed
- `RateLimit-Remaining`: Number of requests remaining in current window
- `RateLimit-Reset`: Time when the rate limit window resets

## Error Responses

When rate limits are exceeded, the API returns a 429 status code with a JSON response:
```json
{
  "success": false,
  "message": "Too many requests from this IP, please try again later."
}
```

## Configuration Notes

1. **Trust Proxy**: The application is configured with `app.set('trust proxy', true)` to properly handle IP addresses behind proxies/load balancers.

2. **Skip Successful Requests**: Authentication rate limiting skips counting successful login attempts to only limit failed attempts.

3. **Standard Headers**: Rate limiting uses standard headers instead of legacy X-RateLimit headers for better compliance.

## Security Benefits

- **Brute Force Protection**: Authentication endpoints are protected against brute force attacks
- **Resource Protection**: AI and resource-intensive endpoints have strict limits
- **Abuse Prevention**: Content creation endpoints prevent spam and abuse
- **Fair Usage**: Read endpoints have generous limits for normal usage patterns
- **DoS Mitigation**: General rate limiting protects against basic DoS attacks

## Monitoring

Rate limiting can be monitored through:
- Response headers in API calls
- Server logs (can be enhanced with custom logging)
- Application performance monitoring tools

## Customization

Rate limits can be adjusted in `/middleware/rateLimitMiddleware.js` based on:
- Traffic patterns
- Server capacity
- User feedback
- Security requirements

The current limits are conservative and can be increased if needed for legitimate use cases.
