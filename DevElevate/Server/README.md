# DevElevate Backend Server

## 🚀 Overview

DevElevate is a comprehensive developer platform that provides learning resources, coding challenges, community features, and career development tools. This backend server is built with Node.js, Express.js, and MongoDB, providing a robust API foundation for the frontend application.

## 🛠️ Tech Stack

- **Runtime**: Node.js with ES6 modules
- **Framework**: Express.js 5.1.0
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens) with bcryptjs
- **Email**: Nodemailer with Gmail SMTP
- **PDF Generation**: PDFKit for dynamic PDF creation
- **Validation**: Zod for request validation
- **File Upload**: Multer for handling file uploads
- **CORS**: Cross-origin resource sharing enabled
- **Environment**: Dotenv for configuration management

## 📁 Project Structure

```
Server/
├── config/           # Database configuration
├── controller/       # Business logic and API handlers
├── middleware/       # Authentication and authorization
├── model/           # MongoDB schemas and models
├── routes/          # API route definitions
├── utils/           # Utility functions and helpers
├── index.js         # Main server entry point
├── pdfServer.js     # PDF generation server
└── package.json     # Dependencies and scripts
```

## 🔐 Authentication & Security

### JWT Implementation

- **Token Storage**: HTTP-only cookies for enhanced security
- **Expiration**: 3-day token validity
- **Cross-Origin**: Configured for cross-domain requests
- **Password Security**: bcryptjs hashing with salt rounds

### Middleware

- **Authentication**: `authenticateToken` - validates JWT tokens
- **Authorization**: `authorize` - role-based access control
- **Admin Access**: `requireAdmin` - restricts admin-only routes

## 🗄️ Database Models

### User Management

- **UserModel**: User accounts with role-based access
  - Fields: name, email, password, role (user/admin)
  - Streak tracking: currentStreak, longestStreak, streakStartDate
  - Timestamps for account creation and updates

### Community Features

- **Question**: Community forum questions
- **Answer**: Responses to community questions
- **Feedback**: User feedback system

### Learning & Assessment

- **Course**: Learning course management
- **LearningModule**: Individual learning modules
- **Quiz**: Assessment and testing system
- **Submission**: Quiz and assignment submissions

### Administrative

- **AdminLog**: System activity logging
- **Notification**: User notification system
- **VisitingWebsite**: User activity tracking

## 🚦 API Endpoints

### Authentication Routes (`/api/v1`)

- `POST /auth/signup` - User registration
- `POST /auth/login` - User login
- `POST /auth/google` - Google OAuth integration
- `GET /logout` - User logout
- `GET /user/streak` - Get user streak information

### User Management

- `POST /feedback` - Submit user feedback
- `GET /latest-news` - Fetch latest news

### Community Routes (`/api/v1/community`)

- Question and answer management
- Community forum functionality
- User interaction tracking

### ATS Scanner (`/api/v1/ats`)

- Resume parsing and analysis
- Keyword extraction and matching
- Job-specific keyword analysis

### AI Integration (`/api/v1`)

- AI-powered features and recommendations
- Machine learning integration

### Admin Routes (`/api/v1/admin`)

- **General Admin**: `/api/v1/admin`
- **Course Management**: `/api/v1/admin/courses`
- **Feedback Management**: `/api/v1/admin/feedback`
- **Quiz Management**: `/api/v1/admin/quiz`

### Notifications (`/api/v1/notifications`)

- Real-time notification system
- User notification preferences

## 🔧 Core Features

### 1. User Authentication System

- Secure registration and login
- Password hashing with bcryptjs
- JWT token management
- Role-based access control (user/admin)

### 2. Streak Tracking System

- Daily activity monitoring
- Streak calculation algorithms
- Progress visualization
- Motivation and engagement features

### 3. Email Integration

- Welcome emails for new users
- HTML email templates
- Gmail SMTP integration
- Automated email notifications

### 4. PDF Generation Service

- Dynamic PDF creation
- Interview preparation guides
- System design handbooks
- Customizable content templates

### 5. Community Platform

- Question and answer system
- User interaction tracking
- Feedback collection
- Community engagement metrics

### 6. Learning Management

- Course creation and management
- Learning module organization
- Quiz and assessment system
- Progress tracking

### 7. ATS Resume Scanner

- Resume parsing and analysis
- Keyword extraction
- Job-specific keyword matching
- Optimization recommendations

### 8. AI Integration

- Machine learning capabilities
- Smart recommendations
- Automated content generation
- Intelligent user assistance

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB database
- Gmail account for email services

### Environment Variables

Create a `.env` file with the following variables:

server/.env

# --------------------
# Backend
# --------------------

### 👉 Replace the placeholders (your_xxx_here) with your actual keys when running locally.

```env
PORT=4000
MONGO_URI=your_mongodb_connection_uri_here
JWT_SECRET=your_jwt_secret_here
FRONTEND_URL=http://localhost:5173
MAIL_USER=your_email_here
MAIL_PASS=your_email_app_password_here
```

### Installation

```bash
# Install dependencies
npm install

# Development mode
npm run dev

# Production mode
npm start
```

### Database Connection

The server automatically connects to MongoDB when the `MONGO_URI` environment variable is available. PDF routes will work without database connection for testing purposes.

## 📊 API Documentation

### Request Format

All API requests should include:

- **Content-Type**: `application/json`
- **Authorization**: Bearer token in headers or cookies
- **CORS**: Configured for cross-origin requests

### Response Format

```json
{
  "success": true/false,
  "message": "Response message",
  "data": {},
  "error": "Error details (if any)"
}
```

### Error Handling

- **400**: Bad Request - Invalid input data
- **401**: Unauthorized - Authentication required
- **403**: Forbidden - Insufficient permissions
- **404**: Not Found - Resource not available
- **500**: Internal Server Error - Server-side issues

## 🔒 Security Features

- **CORS Protection**: Configured for specific origins
- **JWT Security**: Secure token storage and validation
- **Password Hashing**: bcryptjs with salt rounds
- **Input Validation**: Zod schema validation
- **Rate Limiting**: Built-in Express.js protection
- **Secure Cookies**: HTTP-only, secure, same-site configuration

## 📈 Performance Features

- **Database Indexing**: Optimized MongoDB queries
- **Connection Pooling**: Efficient database connections
- **Caching**: Response caching strategies
- **Compression**: Built-in response compression
- **Async Operations**: Non-blocking I/O operations

## 🧪 Testing

- **Admin Testing**: `test-admin.js` for admin functionality
- **Log Generation**: `create-test-logs.js` for testing logs
- **API Testing**: Postman/Insomnia collection ready

## 🚀 Deployment

### Production Considerations

- Environment variable configuration
- Database connection optimization
- SSL/TLS certificate setup
- Monitoring and logging
- Backup strategies

### Docker Support

- Containerized deployment ready
- Environment-specific configurations
- Health check endpoints

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Implement your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the ISC License.

## 🆘 Support

For technical support or questions:

- Check the API documentation
- Review error logs
- Contact the development team

---

The backend is already deployed on Render and the frontend is live on Vercel , ✅ Google Authentication is also working properly. — everything is working properly.

Please follow these important contribution guidelines:

---

🔴 _⚠ IMPORTANT CONTRIBUTION WARNING – READ CAREFULLY ⚠_

_🚧 Important Note:_
The _backend is already deployed on Render_ and the _frontend is live on Vercel_ — everything is working properly.

---

### 🔒 _Strict Contribution Guidelines (Must Follow):_

❗ *YOU ARE *NOT ALLOWED TO:\*\*

🔴 *❌ You are *NOT allowed to change or update any existing backend files or original code.\*\*

🔴 *❌ You are *NOT allowed to update or modify any existing routes or their logic in any form.\*\*

🔴 *❌ You are *NOT allowed to change the project structure or delete/edit core files without permission.\*\*

🔴 *❌ You are *NOT allowed to add or push any .env, .env.local, or sensitive environment files to the frontend OR backend.\*\*

---

🛑 _Note:_
These rules are enforced to maintain the stability and security of the project.
Breaking these may result in your pull request being rejected or closed immediately.

✅ _Always follow the issue guidelines and only make changes related to your assigned task._

---

### ⚙ _Additional Rules:_

- 🔁 _Routing and redirection must remain functional across frontend and backend._
- 🔒 _Do not modify authentication logic (Google Sign-In is already working properly)._
- ⚠ _No direct copy-pasting from ChatGPT — write original, working code only._

---

### 📛 _FINAL WARNING_

_🔴 If your PR modifies, deletes, or breaks any existing structure, logic, or files unrelated to your issue, it will be CLOSED without merging._

---

Let us know in the PR description:

- ✅ Which files you added/edited
- 🔍 How we can test your implementation
- 📦 And screenshots or demo if needed

---

Looking forward to your PR. This feature will be a standout addition to the DevElevate platform! 🚀

⚠ Do not remove or change any existing code unrelated to your issue!
If your PR modifies or deletes any core code without purpose, it will not be merged.

📽 Always try to attach a short screen recording or screenshots of your work to validate your implementation.

⚠ Important:
🛠 ADD A COMMENT – “I would like to work on this. This only if you can do it properly – explain how you will implement it (frontend + backend).
Only then this issue will be assigned to you.

### 🚨 Important Reminder Before You Start! 🚨

Hey folks 👋,

🔐 Login / Sign Up Now Live!
🚀 The Login/Sign Up flow is now fully integrated and functional for both:

- 👤 Users
- 🛡 Admins

---

### ✅ What Works:

- You can now navigate, register, and login through a smooth and responsive interface.
- Frontend (Vercel) and Backend (Render) are now fully connected and live! 🌐✨
- Role-based views and protected routes are set up and functioning.

---

### 💡 Before You Start Working on Any Issue:

✅ Always pull the latest code from main to avoid conflicts!

🔄 Steps to Follow:

1️⃣ Switch to your local branch
2️⃣ Run: git pull origin main ⬇
3️⃣ Start working on your issue 💻✨

🚀 When you're done and ready to push:

4️⃣ Again run: git pull origin main
5️⃣ Resolve any conflicts (if any) 🔧
6️⃣ Push your work: git push origin your-branch-name 📤

---

This keeps the project clean 🧹, updated 🔄, and easier to merge! ✅

---

**DevElevate Backend** - Empowering developers with comprehensive learning and career development tools.

---

💬 Looking forward to your amazing contributions 💻 — let’s build something truly impactful together! 🚀🔥

✨ Keep innovating, keep elevating! 💡🌟

— Abhisek (Project Admin, DevElevate) 🛠🧠💼🌐
