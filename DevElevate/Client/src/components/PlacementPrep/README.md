# Placement Preparation Module

## Overview

The Placement Preparation Module is a comprehensive system designed to help users prepare for job interviews and career advancement. It replaces the previous mock data implementation with real backend integration, providing actual functionality for job applications, AI-powered mock interviews, and resource management.

## Features

### 🎯 Job Opportunities
- **Real Job Data**: Integrated with backend database for actual job listings
- **Advanced Filtering**: Search by role, company, location, category, and experience level
- **Real Applications**: Submit job applications through the platform
- **Application Tracking**: Monitor application status and progress

### 🤖 AI Mock Interviews
- **Interactive Sessions**: Real-time interview practice with AI feedback
- **Multiple Categories**: Technical, HR, Behavioral, and System Design questions
- **Difficulty Levels**: Beginner, Intermediate, Advanced, and Expert
- **Instant Feedback**: AI-generated feedback with scoring and improvement suggestions
- **Session Recording**: Track interview performance over time

### 📚 Learning Resources
- **Downloadable Content**: PDFs, videos, templates, and code samples
- **Categorized Resources**: Interview prep, DSA, System Design, Resume, etc.
- **Progress Tracking**: Monitor downloads and learning progress
- **Rating System**: User reviews and ratings for resources

### 👥 Peer Interviews
- **Partner Matching**: Find interview partners from the community
- **Real-time Practice**: Live interview sessions with other users
- **Role Rotation**: Practice both interviewer and interviewee roles
- **Community Feedback**: Get feedback from multiple perspectives

## Technical Implementation

### Backend Models

#### JobOpportunity
```typescript
interface JobOpportunity {
  _id: string;
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Internship' | 'Contract' | 'Freelance';
  category: 'Product Based' | 'Service Based' | 'Startup' | 'Government' | 'Non-Profit';
  description: string;
  requirements: string[];
  salary: { min: number; max: number; currency: string; period: string };
  experienceLevel: 'Entry' | 'Junior' | 'Mid' | 'Senior' | 'Lead' | 'Principal';
  skills: string[];
  // ... additional fields
}
```

#### InterviewSession
```typescript
interface InterviewSession {
  _id: string;
  type: 'AI Mock' | 'Peer Mock' | 'Practice';
  status: 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled';
  category: 'Technical' | 'HR' | 'Behavioral' | 'System Design' | 'Coding' | 'General';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  questions: Question[];
  feedback: InterviewFeedback;
  // ... additional fields
}
```

#### Resource
```typescript
interface Resource {
  _id: string;
  title: string;
  description: string;
  type: 'PDF' | 'Video' | 'Document' | 'Template' | 'Code' | 'Presentation' | 'Audio';
  category: 'Interview Prep' | 'DSA' | 'System Design' | 'Resume' | 'Cover Letter' | 'Technical Skills' | 'Soft Skills';
  fileUrl: string;
  fileSize: number;
  downloads: number;
  rating: { average: number; count: number };
  // ... additional fields
}
```

### API Endpoints

#### Job Opportunities
- `GET /api/v1/placement/jobs` - Fetch job opportunities with filtering
- `GET /api/v1/placement/jobs/:id` - Get specific job details
- `POST /api/v1/placement/jobs/:jobId/apply` - Submit job application
- `GET /api/v1/placement/users/:userId/applications` - Get user applications

#### Interview Sessions
- `POST /api/v1/placement/interviews` - Create interview session
- `GET /api/v1/placement/interviews` - Fetch interview sessions
- `PUT /api/v1/placement/interviews/:id` - Update interview session
- `POST /api/v1/placement/interviews/ai-mock` - Start AI mock interview

#### Resources
- `GET /api/v1/placement/resources` - Fetch learning resources
- `POST /api/v1/placement/resources/:id/download` - Download resource

### Frontend Components

#### PlacementPrep.tsx
Main component that orchestrates all placement preparation functionality:
- Tab-based navigation (Opportunities, Interviews, Resources, Mock Interviews, Practice)
- Real-time data fetching from backend APIs
- Integration with AI Mock Interview component
- Responsive design with dark mode support

#### AIMockInterview.tsx
Interactive AI-powered mock interview component:
- Question presentation and answer input
- Real-time feedback generation
- Performance scoring and analytics
- Session recording and playback

## Setup and Installation

### Backend Setup

1. **Install Dependencies**
   ```bash
   cd DevElevate/Server
   npm install
   ```

2. **Environment Variables**
   ```env
   MONGO_URI=your_mongodb_connection_string
   PORT=3001
   ```

3. **Seed Database**
   ```bash
   npm run seed:placement
   ```

4. **Start Server**
   ```bash
   npm run dev
   ```

### Frontend Setup

1. **Install Dependencies**
   ```bash
   cd DevElevate/Client
   npm install
   ```

2. **Environment Variables**
   ```env
   VITE_API_URL=http://localhost:3001
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

## Usage Examples

### Starting an AI Mock Interview

```typescript
import { startAIMockInterview } from '../../api/placementApi';

const handleStartInterview = async () => {
  try {
    const session = await startAIMockInterview({
      userId: 'user123',
      category: 'Technical',
      difficulty: 'Intermediate',
      duration: 30
    });
    
    console.log('Interview started:', session);
  } catch (error) {
    console.error('Failed to start interview:', error);
  }
};
```

### Applying to a Job

```typescript
import { applyToJob } from '../../api/placementApi';

const handleJobApplication = async (jobId: string) => {
  try {
    const application = await applyToJob(jobId, {
      userId: 'user123',
      resume: { url: '/resume.pdf', filename: 'resume.pdf' },
      notes: 'Interested in this position'
    });
    
    console.log('Application submitted:', application);
  } catch (error) {
    console.error('Failed to submit application:', error);
  }
};
```

### Downloading Resources

```typescript
import { downloadResource } from '../../api/placementApi';

const handleResourceDownload = async (resourceId: string) => {
  try {
    const download = await downloadResource(resourceId);
    
    // Trigger file download
    const link = document.createElement('a');
    link.href = download.data.fileUrl;
    link.download = download.data.filename;
    link.click();
  } catch (error) {
    console.error('Failed to download resource:', error);
  }
};
```

## Future Enhancements

### Phase 2: Advanced AI Integration
- **OpenAI/Groq Integration**: Real AI-powered question generation and feedback
- **Speech Recognition**: Voice-based interview practice
- **Natural Language Processing**: Advanced answer analysis and scoring

### Phase 3: External API Integration
- **Job Board APIs**: Indeed, LinkedIn, Glassdoor integration
- **ATS Integration**: Resume parsing and optimization
- **Calendar Integration**: Interview scheduling with external calendars

### Phase 4: Advanced Analytics
- **Performance Tracking**: Detailed interview performance metrics
- **Skill Gap Analysis**: Identify areas for improvement
- **Progress Visualization**: Charts and graphs for learning progress

## Contributing

This module is part of the GSOC 2025 contribution program. Contributors will:

- Learn API integration with external services
- Understand AI-powered interview systems
- Implement real-time job matching
- Work with job board APIs
- Contribute to career development platforms

## Testing

### Backend Testing
```bash
# Test API endpoints
curl http://localhost:3001/api/v1/placement/jobs
curl http://localhost:3001/api/v1/placement/resources
```

### Frontend Testing
```bash
# Run component tests
npm test PlacementPrep.test.tsx
npm test AIMockInterview.test.tsx
```

## Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Verify MONGO_URI in environment variables
   - Check MongoDB service status
   - Ensure network connectivity

2. **API Endpoint Not Found**
   - Verify server is running on correct port
   - Check route registration in index.js
   - Ensure middleware is properly configured

3. **Component Not Rendering**
   - Check browser console for errors
   - Verify API responses in Network tab
   - Ensure proper import/export statements

## Support

For technical support or questions about the placement preparation module:

- Create an issue in the project repository
- Contact the development team
- Check the project documentation

---

**Note**: This module replaces the previous mock implementation and provides real backend functionality for a production-ready placement preparation system.
