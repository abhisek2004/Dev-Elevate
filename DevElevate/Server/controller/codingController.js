import axios from 'axios';
import { Problem } from '../model/Problem.js';
import { Submission } from '../model/Submission.js';
import User from '../model/UserModel.js';
import logger from '../utils/logger.js';

// Judge0 API configuration (free tier)
const JUDGE0_API_URL = 'https://judge0-ce.p.rapidapi.com';
const JUDGE0_API_KEY = process.env.JUDGE0_API_KEY || 'your-api-key-here';

// Language ID mapping for Judge0
const LANGUAGE_IDS = {
    'python': 71,      // Python 3.8.1
    'javascript': 63,  // JavaScript (Node.js 12.14.0)
    'java': 62,        // Java (OpenJDK 13.0.1)
    'cpp': 54,         // C++ (GCC 9.2.0)
    'c': 50            // C (GCC 9.2.0)
};

/**
 * Execute code using Judge0 API
 */
export const executeCode = async (req, res) => {
    try {
        const { code, language, problemId } = req.body;
        const userId = req.user.id;

        if (!code || !language || !problemId) {
            return res.status(400).json({
                success: false,
                message: 'Code, language, and problemId are required'
            });
        }

        // Get problem details for test cases
        const problem = await Problem.findById(problemId);
        if (!problem) {
            return res.status(404).json({
                success: false,
                message: 'Problem not found'
            });
        }

        // Get visible test cases only
        const testCases = problem.testCases.filter(tc => !tc.hidden);

        const results = [];
        let totalRuntime = 0;
        let totalMemory = 0;

        // Execute code against each test case
        for (const testCase of testCases) {
            try {
                // Prepare input with test case data
                const inputData = testCase.input;

                // Create submission to Judge0
                const submissionResponse = await axios.post(`${JUDGE0_API_URL}/submissions`, {
                    source_code: code,
                    language_id: LANGUAGE_IDS[language],
                    stdin: inputData,
                    expected_output: testCase.expectedOutput
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-RapidAPI-Key': JUDGE0_API_KEY,
                        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
                    },
                    params: {
                        base64_encoded: false,
                        wait: true
                    }
                });

                const submissionId = submissionResponse.data.token;

                // Wait for execution to complete
                let executionResult;
                let attempts = 0;
                const maxAttempts = 10;

                while (attempts < maxAttempts) {
                    await new Promise(resolve => setTimeout(resolve, 1000));

                    const resultResponse = await axios.get(`${JUDGE0_API_URL}/submissions/${submissionId}`, {
                        headers: {
                            'X-RapidAPI-Key': JUDGE0_API_KEY,
                            'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
                        },
                        params: {
                            base64_encoded: false
                        }
                    });

                    executionResult = resultResponse.data;

                    if (executionResult.status.id > 2) { // Execution completed
                        break;
                    }

                    attempts++;
                }

                // Process execution result
                const result = {
                    testCaseId: testCase.id,
                    input: inputData,
                    expectedOutput: testCase.expectedOutput,
                    actualOutput: executionResult.stdout || '',
                    passed: false,
                    runtime: 0,
                    memory: 0,
                    error: null
                };

                if (executionResult.status.id === 3) { // Accepted
                    result.passed = executionResult.stdout?.trim() === testCase.expectedOutput?.trim();
                    result.runtime = executionResult.time || 0;
                    result.memory = executionResult.memory || 0;
                    totalRuntime += result.runtime;
                    totalMemory += result.memory;
                } else if (executionResult.status.id === 4) { // Wrong Answer
                    result.passed = false;
                    result.error = 'Wrong Answer';
                } else if (executionResult.status.id === 5) { // Time Limit Exceeded
                    result.passed = false;
                    result.error = 'Time Limit Exceeded';
                } else if (executionResult.status.id === 6) { // Compilation Error
                    result.passed = false;
                    result.error = executionResult.compile_output || 'Compilation Error';
                } else if (executionResult.status.id === 7) { // Runtime Error
                    result.passed = false;
                    result.error = executionResult.stderr || 'Runtime Error';
                }

                results.push(result);

            } catch (error) {
                logger.error('Error executing test case:', error);
                results.push({
                    testCaseId: testCase.id,
                    input: testCase.input,
                    expectedOutput: testCase.expectedOutput,
                    actualOutput: '',
                    passed: false,
                    runtime: 0,
                    memory: 0,
                    error: 'Execution failed'
                });
            }
        }

        const passedCount = results.filter(r => r.passed).length;
        const averageRuntime = results.length > 0 ? totalRuntime / results.length : 0;
        const averageMemory = results.length > 0 ? totalMemory / results.length : 0;

        res.json({
            success: true,
            data: {
                results,
                summary: {
                    total: results.length,
                    passed: passedCount,
                    failed: results.length - passedCount,
                    averageRuntime: Math.round(averageRuntime * 100) / 100,
                    averageMemory: Math.round(averageMemory * 100) / 100
                }
            }
        });

    } catch (error) {
        logger.error('Error in executeCode:', error);
        res.status(500).json({
            success: false,
            message: 'Code execution failed',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

/**
 * Submit solution for evaluation
 */
export const submitSolution = async (req, res) => {
    try {
        const { code, language, problemId } = req.body;
        const userId = req.user.id;

        if (!code || !language || !problemId) {
            return res.status(400).json({
                success: false,
                message: 'Code, language, and problemId are required'
            });
        }

        // Get problem details
        const problem = await Problem.findById(problemId);
        if (!problem) {
            return res.status(404).json({
                success: false,
                message: 'Problem not found'
            });
        }

        // Execute against all test cases (including hidden ones)
        const allTestCases = problem.testCases;
        const results = [];
        let totalRuntime = 0;
        let totalMemory = 0;
        let allPassed = true;

        for (const testCase of allTestCases) {
            try {
                const inputData = testCase.input;

                const submissionResponse = await axios.post(`${JUDGE0_API_URL}/submissions`, {
                    source_code: code,
                    language_id: LANGUAGE_IDS[language],
                    stdin: inputData,
                    expected_output: testCase.expectedOutput
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-RapidAPI-Key': JUDGE0_API_KEY,
                        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
                    },
                    params: {
                        base64_encoded: false,
                        wait: true
                    }
                });

                const submissionId = submissionResponse.data.token;

                // Wait for execution
                let executionResult;
                let attempts = 0;
                const maxAttempts = 15; // Longer wait for submission

                while (attempts < maxAttempts) {
                    await new Promise(resolve => setTimeout(resolve, 1000));

                    const resultResponse = await axios.get(`${JUDGE0_API_URL}/submissions/${submissionId}`, {
                        headers: {
                            'X-RapidAPI-Key': JUDGE0_API_KEY,
                            'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
                        },
                        params: {
                            base64_encoded: false
                        }
                    });

                    executionResult = resultResponse.data;

                    if (executionResult.status.id > 2) {
                        break;
                    }

                    attempts++;
                }

                const result = {
                    testCaseId: testCase.id,
                    input: inputData,
                    expectedOutput: testCase.expectedOutput,
                    actualOutput: executionResult.stdout || '',
                    passed: false,
                    runtime: 0,
                    memory: 0,
                    error: null
                };

                if (executionResult.status.id === 3) {
                    result.passed = executionResult.stdout?.trim() === testCase.expectedOutput?.trim();
                    result.runtime = executionResult.time || 0;
                    result.memory = executionResult.memory || 0;
                    totalRuntime += result.runtime;
                    totalMemory += result.memory;

                    if (!result.passed) {
                        allPassed = false;
                    }
                } else {
                    allPassed = false;
                    if (executionResult.status.id === 4) {
                        result.error = 'Wrong Answer';
                    } else if (executionResult.status.id === 5) {
                        result.error = 'Time Limit Exceeded';
                    } else if (executionResult.status.id === 6) {
                        result.error = executionResult.compile_output || 'Compilation Error';
                    } else if (executionResult.status.id === 7) {
                        result.error = executionResult.stderr || 'Runtime Error';
                    }
                }

                results.push(result);

            } catch (error) {
                logger.error('Error executing test case for submission:', error);
                allPassed = false;
                results.push({
                    testCaseId: testCase.id,
                    input: testCase.input,
                    expectedOutput: testCase.expectedOutput,
                    actualOutput: '',
                    passed: false,
                    runtime: 0,
                    memory: 0,
                    error: 'Execution failed'
                });
            }
        }

        // Calculate performance metrics
        const averageRuntime = results.length > 0 ? totalRuntime / results.length : 0;
        const averageMemory = results.length > 0 ? totalMemory / results.length : 0;

        // Create submission record
        const submission = new Submission({
            userId,
            problemId,
            code,
            language,
            results,
            passed: allPassed,
            runtime: Math.round(averageRuntime * 100) / 100,
            memory: Math.round(averageMemory * 100) / 100,
            submittedAt: new Date()
        });

        await submission.save();

        // Update user stats if solution is accepted
        if (allPassed) {
            await User.findByIdAndUpdate(userId, {
                $inc: {
                    problemsSolved: 1,
                    totalSubmissions: 1
                }
            });
        } else {
            await User.findByIdAndUpdate(userId, {
                $inc: { totalSubmissions: 1 }
            });
        }

        res.json({
            success: true,
            data: {
                submissionId: submission._id,
                passed: allPassed,
                results,
                summary: {
                    total: results.length,
                    passed: results.filter(r => r.passed).length,
                    failed: results.filter(r => !r.passed).length,
                    averageRuntime: Math.round(averageRuntime * 100) / 100,
                    averageMemory: Math.round(averageMemory * 100) / 100
                }
            }
        });

    } catch (error) {
        logger.error('Error in submitSolution:', error);
        res.status(500).json({
            success: false,
            message: 'Solution submission failed',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

/**
 * Get all problems
 */
export const getProblems = async (req, res) => {
    try {
        const { difficulty, category, page = 1, limit = 20 } = req.query;

        const filter = {};
        if (difficulty) filter.difficulty = difficulty;
        if (category) filter.category = category;

        const skip = (page - 1) * limit;

        const problems = await Problem.find(filter)
            .select('-testCases.hidden -testCases.expectedOutput')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit));

        const total = await Problem.countDocuments(filter);

        res.json({
            success: true,
            data: {
                problems,
                pagination: {
                    page: parseInt(page),
                    limit: parseInt(limit),
                    total,
                    pages: Math.ceil(total / limit)
                }
            }
        });

    } catch (error) {
        logger.error('Error in getProblems:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch problems'
        });
    }
};

/**
 * Get problem by ID
 */
export const getProblemById = async (req, res) => {
    try {
        const { id } = req.params;

        const problem = await Problem.findById(id);
        if (!problem) {
            return res.status(404).json({
                success: false,
                message: 'Problem not found'
            });
        }

        res.json({
            success: true,
            data: problem
        });

    } catch (error) {
        logger.error('Error in getProblemById:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch problem'
        });
    }
};

/**
 * Create new problem (admin only)
 */
export const createProblem = async (req, res) => {
    try {
        const problemData = req.body;

        const problem = new Problem(problemData);
        await problem.save();

        res.status(201).json({
            success: true,
            data: problem,
            message: 'Problem created successfully'
        });

    } catch (error) {
        logger.error('Error in createProblem:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create problem'
        });
    }
};

/**
 * Update problem (admin only)
 */
export const updateProblem = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const problem = await Problem.findByIdAndUpdate(id, updateData, { new: true });
        if (!problem) {
            return res.status(404).json({
                success: false,
                message: 'Problem not found'
            });
        }

        res.json({
            success: true,
            data: problem,
            message: 'Problem updated successfully'
        });

    } catch (error) {
        logger.error('Error in updateProblem:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update problem'
        });
    }
};

/**
 * Delete problem (admin only)
 */
export const deleteProblem = async (req, res) => {
    try {
        const { id } = req.params;

        const problem = await Problem.findByIdAndDelete(id);
        if (!problem) {
            return res.status(404).json({
                success: false,
                message: 'Problem not found'
            });
        }

        res.json({
            success: true,
            message: 'Problem deleted successfully'
        });

    } catch (error) {
        logger.error('Error in deleteProblem:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete problem'
        });
    }
};

/**
 * Get user submissions
 */
export const getSubmissions = async (req, res) => {
    try {
        const userId = req.user.id;
        const { page = 1, limit = 20 } = req.query;

        const skip = (page - 1) * limit;

        const submissions = await Submission.find({ userId })
            .populate('problemId', 'title difficulty')
            .sort({ submittedAt: -1 })
            .skip(skip)
            .limit(parseInt(limit));

        const total = await Submission.countDocuments({ userId });

        res.json({
            success: true,
            data: {
                submissions,
                pagination: {
                    page: parseInt(page),
                    limit: parseInt(limit),
                    total,
                    pages: Math.ceil(total / limit)
                }
            }
        });

    } catch (error) {
        logger.error('Error in getSubmissions:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch submissions'
        });
    }
};

/**
 * Get leaderboard
 */
export const getLeaderboard = async (req, res) => {
    try {
        const { page = 1, limit = 50 } = req.query;

        const skip = (page - 1) * limit;

        const leaderboard = await User.aggregate([
            {
                $project: {
                    username: 1,
                    problemsSolved: 1,
                    totalSubmissions: 1,
                    successRate: {
                        $cond: {
                            if: { $eq: ['$totalSubmissions', 0] },
                            then: 0,
                            else: {
                                $multiply: [
                                    { $divide: ['$problemsSolved', '$totalSubmissions'] },
                                    100
                                ]
                            }
                        }
                    }
                }
            },
            { $sort: { problemsSolved: -1, successRate: -1 } },
            { $skip: skip },
            { $limit: parseInt(limit) }
        ]);

        const total = await User.countDocuments();

        res.json({
            success: true,
            data: {
                leaderboard,
                pagination: {
                    page: parseInt(page),
                    limit: parseInt(limit),
                    total,
                    pages: Math.ceil(total / limit)
                }
            }
        });

    } catch (error) {
        logger.error('Error in getLeaderboard:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch leaderboard'
        });
    }
};

/**
 * Get user stats
 */
export const getUserStats = async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await User.findById(userId).select('problemsSolved totalSubmissions');
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        const successRate = user.totalSubmissions > 0
            ? Math.round((user.problemsSolved / user.totalSubmissions) * 100)
            : 0;

        res.json({
            success: true,
            data: {
                problemsSolved: user.problemsSolved || 0,
                totalSubmissions: user.totalSubmissions || 0,
                successRate
            }
        });

    } catch (error) {
        logger.error('Error in getUserStats:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch user stats'
        });
    }
};
