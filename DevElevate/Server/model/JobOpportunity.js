import mongoose from 'mongoose';

const jobOpportunitySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    company: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        enum: ['Full-time', 'Part-time', 'Internship', 'Contract', 'Freelance'],
        default: 'Full-time'
    },
    category: {
        type: String,
        enum: ['Product Based', 'Service Based', 'Startup', 'Government', 'Non-Profit'],
        default: 'Product Based'
    },
    description: {
        type: String,
        required: true
    },
    requirements: [{
        type: String,
        trim: true
    }],
    responsibilities: [{
        type: String,
        trim: true
    }],
    salary: {
        min: Number,
        max: Number,
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
    benefits: [{
        type: String,
        trim: true
    }],
    deadline: {
        type: Date
    },
    postedDate: {
        type: Date,
        default: Date.now
    },
    source: {
        type: String,
        enum: ['Indeed', 'LinkedIn', 'Glassdoor', 'Company Website', 'Internal'],
        default: 'Internal'
    },
    sourceUrl: {
        type: String,
        trim: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    tags: [{
        type: String,
        trim: true
    }],
    experienceLevel: {
        type: String,
        enum: ['Entry', 'Junior', 'Mid', 'Senior', 'Lead', 'Principal'],
        default: 'Mid'
    },
    skills: [{
        type: String,
        trim: true
    }],
    applicationCount: {
        type: Number,
        default: 0
    },
    views: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

// Index for search functionality
jobOpportunitySchema.index({
    title: 'text',
    company: 'text',
    description: 'text',
    skills: 'text',
    tags: 'text'
});

export default mongoose.model('JobOpportunity', jobOpportunitySchema);
