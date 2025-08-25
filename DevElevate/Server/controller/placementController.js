import JobOpportunity from '../model/JobOpportunity.js';
import InterviewSession from '../model/InterviewSession.js';
import Resource from '../model/Resource.js';
import JobApplication from '../model/JobApplication.js';
import UserModel from '../model/UserModel.js';
import axios from 'axios';

// Job Opportunities Controller
export const getJobOpportunities = async (req, res) => {
    try {
        const {
            page = 1,
            limit = 10,
            search,
            category,
            location,
            type,
            experienceLevel,
            sortBy = 'postedDate',
            sortOrder = 'desc'
        } = req.query;

        const skip = (page - 1) * limit;
        let query = { isActive: true };

        // Search functionality
        if (search) {
            query.$text = { $search: search };
        }

        // Filter by category
        if (category && category !== 'All Categories') {
            query.category = category;
        }

        // Filter by location
        if (location) {
            query.location = { $regex: location, $options: 'i' };
        }

        // Filter by job type
        if (type) {
            query.type = type;
        }

        // Filter by experience level
        if (experienceLevel) {
            query.experienceLevel = experienceLevel;
        }

        // Sorting
        const sortOptions = {};
        sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

        const jobs = await JobOpportunity.find(query)
            .sort(sortOptions)
            .skip(skip)
            .limit(parseInt(limit))
            .select('-__v');

        const total = await JobOpportunity.countDocuments(query);

        // Increment view count for each job
        const jobIds = jobs.map(job => job._id);
        await JobOpportunity.updateMany(
            { _id: { $in: jobIds } },
            { $inc: { views: 1 } }
        );

        res.status(200).json({
            success: true,
            data: {
                jobs,
                pagination: {
                    currentPage: parseInt(page),
                    totalPages: Math.ceil(total / limit),
                    totalJobs: total,
                    hasNext: page * limit < total,
                    hasPrev: page > 1
                }
            }
        });
    } catch (error) {
        console.error('Error fetching job opportunities:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch job opportunities',
            error: error.message
        });
    }
};

export const getJobById = async (req, res) => {
    try {
        const { id } = req.params;
        const job = await JobOpportunity.findById(id);

        if (!job) {
            return res.status(404).json({
                success: false,
                message: 'Job opportunity not found'
            });
        }

        // Increment view count
        await JobOpportunity.findByIdAndUpdate(id, { $inc: { views: 1 } });

        res.status(200).json({
            success: true,
            data: job
        });
    } catch (error) {
        console.error('Error fetching job by ID:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch job details',
            error: error.message
        });
    }
};

export const applyToJob = async (req, res) => {
    try {
        const { jobId } = req.params;
        const { userId } = req.body;
        const { resume, coverLetter, portfolio, additionalDocuments, salaryExpectation, availability, notes } = req.body;

        // Check if user has already applied
        const existingApplication = await JobApplication.findOne({
            userId,
            jobId
        });

        if (existingApplication) {
            return res.status(400).json({
                success: false,
                message: 'You have already applied to this job'
            });
        }

        // Create new application
        const application = new JobApplication({
            userId,
            jobId,
            resume,
            coverLetter,
            portfolio,
            additionalDocuments,
            salaryExpectation,
            availability,
            notes
        });

        await application.save();

        // Increment application count for the job
        await JobOpportunity.findByIdAndUpdate(jobId, {
            $inc: { applicationCount: 1 }
        });

        res.status(201).json({
            success: true,
            message: 'Application submitted successfully',
            data: application
        });
    } catch (error) {
        console.error('Error applying to job:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to submit application',
            error: error.message
        });
    }
};

export const getUserApplications = async (req, res) => {
    try {
        const { userId } = req.params;
        const { page = 1, limit = 10, status } = req.query;

        const skip = (page - 1) * limit;
        let query = { userId };

        if (status) {
            query.status = status;
        }

        const applications = await JobApplication.find(query)
            .populate('jobId', 'title company location type category')
            .sort({ appliedAt: -1 })
            .skip(skip)
            .limit(parseInt(limit));

        const total = await JobApplication.countDocuments(query);

        res.status(200).json({
            success: true,
            data: {
                applications,
                pagination: {
                    currentPage: parseInt(page),
                    totalPages: Math.ceil(total / limit),
                    totalApplications: total,
                    hasNext: page * limit < total,
                    hasPrev: page > 1
                }
            }
        });
    } catch (error) {
        console.error('Error fetching user applications:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch applications',
            error: error.message
        });
    }
};

// Interview Sessions Controller
export const createInterviewSession = async (req, res) => {
    try {
        const { type, category, difficulty, duration, scheduledAt, participants } = req.body;

        const session = new InterviewSession({
            type,
            category,
            difficulty,
            duration,
            scheduledAt,
            participants
        });

        await session.save();

        res.status(201).json({
            success: true,
            message: 'Interview session created successfully',
            data: session
        });
    } catch (error) {
        console.error('Error creating interview session:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create interview session',
            error: error.message
        });
    }
};

export const getInterviewSessions = async (req, res) => {
    try {
        const { userId, type, status, category } = req.query;
        let query = {};

        if (userId) {
            query['participants.userId'] = userId;
        }

        if (type) {
            query.type = type;
        }

        if (status) {
            query.status = status;
        }

        if (category) {
            query.category = category;
        }

        const sessions = await InterviewSession.find(query)
            .populate('participants.userId', 'name email avatar')
            .sort({ scheduledAt: -1 });

        res.status(200).json({
            success: true,
            data: sessions
        });
    } catch (error) {
        console.error('Error fetching interview sessions:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch interview sessions',
            error: error.message
        });
    }
};

export const updateInterviewSession = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const session = await InterviewSession.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!session) {
            return res.status(404).json({
                success: false,
                message: 'Interview session not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Interview session updated successfully',
            data: session
        });
    } catch (error) {
        console.error('Error updating interview session:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update interview session',
            error: error.message
        });
    }
};

// Resources Controller
export const getResources = async (req, res) => {
    try {
        const {
            page = 1,
            limit = 10,
            search,
            category,
            type,
            difficulty,
            sortBy = 'downloads',
            sortOrder = 'desc'
        } = req.query;

        const skip = (page - 1) * limit;
        let query = { isActive: true };

        // Search functionality
        if (search) {
            query.$text = { $search: search };
        }

        // Filter by category
        if (category) {
            query.category = category;
        }

        // Filter by type
        if (type) {
            query.type = type;
        }

        // Filter by difficulty
        if (difficulty) {
            query.difficulty = difficulty;
        }

        // Sorting
        const sortOptions = {};
        sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

        const resources = await Resource.find(query)
            .sort(sortOptions)
            .skip(skip)
            .limit(parseInt(limit))
            .select('-__v');

        const total = await Resource.countDocuments(query);

        res.status(200).json({
            success: true,
            data: {
                resources,
                pagination: {
                    currentPage: parseInt(page),
                    totalPages: Math.ceil(total / limit),
                    totalResources: total,
                    hasNext: page * limit < total,
                    hasPrev: page > 1
                }
            }
        });
    } catch (error) {
        console.error('Error fetching resources:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch resources',
            error: error.message
        });
    }
};

export const downloadResource = async (req, res) => {
    try {
        const { id } = req.params;
        const resource = await Resource.findById(id);

        if (!resource) {
            return res.status(404).json({
                success: false,
                message: 'Resource not found'
            });
        }

        // Increment download count
        await Resource.findByIdAndUpdate(id, {
            $inc: { downloads: 1 }
        });

        // In a real implementation, you would handle file streaming here
        // For now, we'll return the file URL
        res.status(200).json({
            success: true,
            message: 'Download started',
            data: {
                fileUrl: resource.fileUrl,
                filename: resource.title,
                fileSize: resource.fileSize
            }
        });
    } catch (error) {
        console.error('Error downloading resource:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to download resource',
            error: error.message
        });
    }
};

// AI Mock Interview Controller
export const startAIMockInterview = async (req, res) => {
    try {
        const { userId, category, difficulty, duration } = req.body;

        // Generate AI interview questions based on category and difficulty
        const questions = await generateAIQuestions(category, difficulty);

        const session = new InterviewSession({
            type: 'AI Mock',
            category,
            difficulty,
            duration,
            scheduledAt: new Date(),
            participants: [{ userId, role: 'Interviewee' }],
            questions,
            status: 'In Progress'
        });

        await session.save();

        res.status(201).json({
            success: true,
            message: 'AI Mock Interview started successfully',
            data: session
        });
    } catch (error) {
        console.error('Error starting AI mock interview:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to start AI mock interview',
            error: error.message
        });
    }
};

// Helper function to generate AI questions
const generateAIQuestions = async (category, difficulty) => {
    // This would integrate with an AI service like OpenAI or Groq
    // For now, returning mock questions
    const questionBank = {
        'Technical': {
            'Beginner': [
                'What is the difference between let, const, and var in JavaScript?',
                'Explain the concept of closures in JavaScript.',
                'What is the difference between == and === in JavaScript?'
            ],
            'Intermediate': [
                'Explain the event loop in JavaScript.',
                'What are Promises and how do they work?',
                'Explain the concept of prototypal inheritance.'
            ],
            'Advanced': [
                'How would you implement a debounce function?',
                'Explain the concept of currying in functional programming.',
                'How does garbage collection work in JavaScript?'
            ]
        },
        'HR': {
            'Beginner': [
                'Tell me about yourself.',
                'Why are you interested in this position?',
                'What are your strengths and weaknesses?'
            ],
            'Intermediate': [
                'Describe a challenging situation you faced at work.',
                'How do you handle stress and pressure?',
                'Where do you see yourself in 5 years?'
            ],
            'Advanced': [
                'How do you handle conflicts with team members?',
                'Describe a time when you had to make a difficult decision.',
                'How do you stay motivated during challenging projects?'
            ]
        }
    };

    const questions = questionBank[category]?.[difficulty] || questionBank['Technical']['Intermediate'];

    return questions.map(q => ({
        question: q,
        type: category,
        difficulty,
        answer: '',
        feedback: '',
        score: 0
    }));
};

// External Job API Integration
export const fetchExternalJobs = async (req, res) => {
    try {
        const { keywords, location, page = 1 } = req.query;

        // This would integrate with real job APIs like Indeed, LinkedIn, etc.
        // For now, returning mock data
        const mockJobs = [
            {
                title: 'Senior Software Engineer',
                company: 'Tech Corp',
                location: 'San Francisco, CA',
                type: 'Full-time',
                description: 'Join our growing team...',
                requirements: ['5+ years experience', 'React/Node.js', 'System design'],
                salary: { min: 150000, max: 200000, currency: 'USD', period: 'yearly' },
                source: 'External API',
                sourceUrl: 'https://example.com/job'
            }
        ];

        res.status(200).json({
            success: true,
            data: mockJobs
        });
    } catch (error) {
        console.error('Error fetching external jobs:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch external jobs',
            error: error.message
        });
    }
};
