import mongoose from 'mongoose';

const interviewSessionSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['AI Mock', 'Peer Mock', 'Practice'],
        required: true
    },
    status: {
        type: String,
        enum: ['Scheduled', 'In Progress', 'Completed', 'Cancelled'],
        default: 'Scheduled'
    },
    participants: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        role: {
            type: String,
            enum: ['Interviewer', 'Interviewee', 'Observer'],
            default: 'Interviewee'
        },
        joinedAt: {
            type: Date,
            default: Date.now
        }
    }],
    category: {
        type: String,
        enum: ['Technical', 'HR', 'Behavioral', 'System Design', 'Coding', 'General'],
        required: true
    },
    difficulty: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
        default: 'Intermediate'
    },
    duration: {
        type: Number, // in minutes
        default: 60
    },
    scheduledAt: {
        type: Date,
        required: true
    },
    startedAt: {
        type: Date
    },
    endedAt: {
        type: Date
    },
    questions: [{
        question: {
            type: String,
            required: true
        },
        type: {
            type: String,
            enum: ['Technical', 'HR', 'Behavioral', 'Coding', 'System Design'],
            required: true
        },
        difficulty: {
            type: String,
            enum: ['Easy', 'Medium', 'Hard'],
            default: 'Medium'
        },
        answer: {
            type: String
        },
        feedback: {
            type: String
        },
        score: {
            type: Number,
            min: 0,
            max: 10
        }
    }],
    feedback: {
        overallScore: {
            type: Number,
            min: 0,
            max: 10
        },
        strengths: [{
            type: String
        }],
        areasForImprovement: [{
            type: String
        }],
        generalFeedback: {
            type: String
        },
        technicalSkills: {
            type: Number,
            min: 0,
            max: 10
        },
        communicationSkills: {
            type: Number,
            min: 0,
            max: 10
        },
        problemSolving: {
            type: Number,
            min: 0,
            max: 10
        }
    },
    recording: {
        url: String,
        duration: Number
    },
    notes: {
        type: String
    },
    tags: [{
        type: String
    }]
}, {
    timestamps: true
});

export default mongoose.model('InterviewSession', interviewSessionSchema);
