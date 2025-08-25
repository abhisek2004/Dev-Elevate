import mongoose from 'mongoose';

const testCaseSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    input: {
        type: String,
        required: true
    },
    expectedOutput: {
        type: String,
        required: true
    },
    hidden: {
        type: Boolean,
        default: false
    }
});

const exampleSchema = new mongoose.Schema({
    input: {
        type: String,
        required: true
    },
    output: {
        type: String,
        required: true
    },
    explanation: String
});

const starterCodeSchema = new mongoose.Schema({
    python: String,
    javascript: String,
    java: String,
    cpp: String,
    c: String
});

const problemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard'],
        required: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    tags: [{
        type: String,
        trim: true
    }],
    examples: [exampleSchema],
    constraints: [String],
    testCases: [testCaseSchema],
    acceptance: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    },
    submissions: {
        type: Number,
        default: 0
    },
    starterCode: starterCodeSchema,
    timeLimit: {
        type: Number,
        default: 1000, // milliseconds
        min: 100,
        max: 10000
    },
    memoryLimit: {
        type: Number,
        default: 128, // MB
        min: 16,
        max: 512
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update the updatedAt field before saving
problemSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

// Index for efficient querying
problemSchema.index({ difficulty: 1, category: 1 });
problemSchema.index({ title: 'text', description: 'text' });

export const Problem = mongoose.model('Problem', problemSchema);
