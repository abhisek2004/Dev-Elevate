import mongoose from 'mongoose';

const jobApplicationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'JobOpportunity',
        required: true
    },
    status: {
        type: String,
        enum: ['Applied', 'Under Review', 'Shortlisted', 'Interview Scheduled', 'Interview Completed', 'Offer Extended', 'Rejected', 'Withdrawn'],
        default: 'Applied'
    },
    appliedAt: {
        type: Date,
        default: Date.now
    },
    resume: {
        url: String,
        filename: String,
        version: String
    },
    coverLetter: {
        url: String,
        filename: String,
        content: String
    },
    portfolio: {
        url: String,
        description: String
    },
    additionalDocuments: [{
        name: String,
        url: String,
        type: String
    }],
    notes: {
        type: String
    },
    followUpDate: {
        type: Date
    },
    interviewScheduled: {
        type: Date
    },
    companyNotes: {
        type: String
    },
    salaryExpectation: {
        amount: Number,
        currency: {
            type: String,
            default: 'USD'
        },
        period: {
            type: String,
            enum: ['hourly', 'monthly', 'yearly'],
            default: 'yearly'
        }
    },
    availability: {
        startDate: Date,
        noticePeriod: Number // in days
    },
    tags: [{
        type: String
    }],
    source: {
        type: String,
        enum: ['DevElevate', 'Company Website', 'Job Board', 'Referral', 'Networking'],
        default: 'DevElevate'
    }
}, {
    timestamps: true
});

// Index for efficient queries
jobApplicationSchema.index({ userId: 1, status: 1 });
jobApplicationSchema.index({ jobId: 1, status: 1 });
jobApplicationSchema.index({ appliedAt: -1 });

export default mongoose.model('JobApplication', jobApplicationSchema);
