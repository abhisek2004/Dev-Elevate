import mongoose from 'mongoose';

const resourceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['PDF', 'Video', 'Document', 'Template', 'Code', 'Presentation', 'Audio'],
        required: true
    },
    category: {
        type: String,
        enum: ['Interview Prep', 'DSA', 'System Design', 'Resume', 'Cover Letter', 'Technical Skills', 'Soft Skills'],
        required: true
    },
    difficulty: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
        default: 'Intermediate'
    },
    fileUrl: {
        type: String,
        required: true
    },
    fileSize: {
        type: Number, // in bytes
        required: true
    },
    thumbnail: {
        type: String
    },
    tags: [{
        type: String,
        trim: true
    }],
    author: {
        type: String,
        trim: true
    },
    version: {
        type: String,
        default: '1.0'
    },
    isActive: {
        type: Boolean,
        default: true
    },
    downloads: {
        type: Number,
        default: 0
    },
    views: {
        type: Number,
        default: 0
    },
    rating: {
        average: {
            type: Number,
            default: 0,
            min: 0,
            max: 5
        },
        count: {
            type: Number,
            default: 0
        }
    },
    reviews: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        },
        comment: {
            type: String
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],
    relatedResources: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Resource'
    }],
    prerequisites: [{
        type: String
    }],
    learningOutcomes: [{
        type: String
    }],
    estimatedTime: {
        type: Number, // in minutes
        default: 60
    }
}, {
    timestamps: true
});

// Index for search functionality
resourceSchema.index({
    title: 'text',
    description: 'text',
    tags: 'text',
    category: 'text'
});

export default mongoose.model('Resource', resourceSchema);
