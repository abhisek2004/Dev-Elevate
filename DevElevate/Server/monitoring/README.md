# Monitoring Setup (Phase 1: UptimeRobot)

## 1. Health Check Route
We have added a `/healthUptime` route that is already enabled in the backend.

Endpoint:
https://<your-deployed-domain>/monitoring/healthUptime

Example Response
```json
{
  "status": "UP",
  "message": "Health check working fine",
  "timestamp": "2025-09-13T10:00:00.000Z"
}