import Contest from "../model/Contest.js";
import Problem from "../model/Problem.js";
import ContestSubmission from "../model/ContestSubmission.js";
import mongoose from "mongoose";
import axios from "axios";
import { io, notifyContestSubmission } from "../socket.js"; // Import socket.io instance
import { createNotification } from "../controller/notificationController.js";
import { calculateContestRatings } from "../utils/ratingCalculator.js";
import User from "../model/UserModel.js";
// Judge0 API configuration
const JUDGE0_API_URL =
  process.env.JUDGE0_API_URL || "https://judge0-ce.p.rapidapi.com";
const JUDGE0_API_KEY = process.env.JUDGE0_API_KEY;
const JUDGE0_HOST = process.env.JUDGE0_HOST || "judge0-ce.p.rapidapi.com";

// Add this function to your existing contestController.js file
export const getUserStats = async (req, res) => {
  try {
    const userId = req.user.id;
    // Query for contest participation data
    const userContests = await ContestSubmission.find({ userId });

    // Get contests the user has participated in
    const contestIds =
      userContests.length > 0
        ? [...new Set(userContests.map((sub) => sub.contestId.toString()))]
        : [];

    // Calculate contests joined
    const contestsJoined = contestIds.length;

    // Calculate total score from all submissions
    const totalScore = userContests.reduce(
      (sum, sub) => sum + (sub.points || 0),
      0
    );

    // Find best rank and top 10 finishes if user has participated in contests
    let bestRank = 0;
    let top10Finishes = 0;

    if (contestIds.length > 0) {
      // For each contest, find the user's rank
      for (const contestId of contestIds) {
        // Get all submissions for this contest to determine ranking
        const contestSubmissions = await ContestSubmission.find({
          contestId,
          status: "Accepted",
        }).sort({ points: -1, penalty: 1 });

        // Find user's position in this contest
        const userPosition =
          contestSubmissions.findIndex(
            (sub) => sub.userId.toString() === userId.toString()
          ) + 1; // +1 because array index starts at 0

        if (userPosition > 0) {
          // Update best rank (lowest number is better)
          if (bestRank === 0 || userPosition < bestRank) {
            bestRank = userPosition;
          }

          // Check if this was a top 10 finish
          if (userPosition <= 10) {
            top10Finishes++;
          }
        }
      }
    }

    // Prepare stats object
    const stats = {
      contestsJoined,
      top10Finishes,
      bestRank: bestRank > 0 ? bestRank : 0,
      totalScore,
    };

    return res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error("Error fetching user stats:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch user stats",
      error: error.message,
    });
  }
};

// Get contests filtered by status (upcoming, running, past)
export const getContestsByStatus = async (req, res) => {
  try {
    const { status } = req.query;
    const currentDate = new Date();

    let query = {};

    // Filter contests based on status parameter
    if (status) {
      if (status === "upcoming") {
        query = { startTime: { $gt: currentDate } };
      } else if (status === "running") {
        query = {
          startTime: { $lte: currentDate },
          endTime: { $gte: currentDate },
        };
      } else if (status === "past") {
        query = { endTime: { $lt: currentDate } };
      }
    }

    // Add additional filters (optional)
    const { difficulty, limit = 10, page = 1 } = req.query;
    if (difficulty) {
      query.difficulty = difficulty;
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Find contests with pagination
    const contests = await Contest.find(query)
      .sort({ startTime: status === "past" ? -1 : 1 }) // Sort past contests by most recent
      .skip(skip)
      .limit(parseInt(limit))
      .populate("createdBy", "name")
      .select("-ratingChanges"); // Exclude large rating data from list view

    // Get total count for pagination
    const total = await Contest.countDocuments(query);

    // Return data with pagination info
    res.status(200).json({
      success: true,
      data: {
        contests,
        pagination: {
          total,
          page: parseInt(page),
          limit: parseInt(limit),
          pages: Math.ceil(total / parseInt(limit)),
        },
      },
    });
  } catch (error) {
    console.error("Error fetching contests:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch contests",
      error: error.message,
    });
  }
};

// Get contest details by ID
export const getContestById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate contest ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid contest ID format",
      });
    }

    // Find contest and populate related data
    const contest = await Contest.findById(id)
      .populate("createdBy", "name email")
      .populate({
        path: "participants",
        select: "name email profileImage",
      });

    if (!contest) {
      return res.status(404).json({
        success: false,
        message: "Contest not found",
      });
    }

    // Determine if problems should be populated
    // Only populate problems if contest is running or finished, or if requester is admin
    const currentTime = new Date();
    const isAdmin = req.user && req.user.role === "admin";
    const contestStarted = currentTime >= contest.startTime;

    let contestData = contest.toObject();

    if (contestStarted || isAdmin) {
      // If contest has started or user is admin, populate problems
      const populatedContest = await Contest.findById(id)
        .populate("createdBy", "name email")
        .populate({
          path: "participants",
          select: "name email profileImage",
        })
        .populate({
          path: "problems",
          select: "title difficulty category points",
        });

      contestData = populatedContest.toObject();
    } else {
      // If contest hasn't started, just show problem count
      contestData.problemCount = contest.problems.length;
      contestData.problems = []; // Empty the problems array
    }

    // Add computed properties
    contestData.status = contest.getCurrentStatus();
    contestData.isRegistered = contest.participants.some(
      (participant) =>
        participant._id.toString() === (req.user?._id?.toString() || "")
    );

    // Don't expose full rating changes in API response (large data)
    delete contestData.ratingChanges;

    res.status(200).json({
      success: true,
      data: contestData,
    });
  } catch (error) {
    console.error("Error fetching contest:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch contest details",
      error: error.message,
    });
  }
};

// Register a user for a contest
export const registerForContest = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    // Validate contest ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid contest ID format",
      });
    }

    // Find the contest
    const contest = await Contest.findById(id);

    if (!contest) {
      return res.status(404).json({
        success: false,
        message: "Contest not found",
      });
    }

    // Check if registration is open (contest hasn't started yet)
    const currentTime = new Date();
    if (currentTime >= contest.startTime) {
      return res.status(400).json({
        success: false,
        message: "Registration closed. Contest has already started.",
      });
    }

    // Check if user is already registered
    if (contest.participants.includes(userId)) {
      return res.status(400).json({
        success: false,
        message: "You are already registered for this contest",
      });
    }

    // Check if contest has reached participant limit
    if (
      contest.maxParticipants &&
      contest.participants.length >= contest.maxParticipants
    ) {
      return res.status(400).json({
        success: false,
        message: "Contest has reached maximum number of participants",
      });
    }

    // Add user to participants
    contest.participants.push(userId);
    await contest.save();

    // Create a notification for the user
    try {
      await createNotification({
        userId: userId,
        title: "Contest Registration Successful",
        message: `You have successfully registered for "${
          contest.title
        }". The contest starts on ${new Date(
          contest.startTime
        ).toLocaleString()}`,
        type: "contest",
        link: `/contests/${id}`,
      });
    } catch (notificationError) {
      console.error("Error creating notification:", notificationError);
      // Continue execution even if notification fails
    }

    res.status(200).json({
      success: true,
      message: "Successfully registered for the contest",
      data: {
        contestId: contest._id,
        contestTitle: contest.title,
        startTime: contest.startTime,
        endTime: contest.endTime,
      },
    });
  } catch (error) {
    console.error("Error registering for contest:", error);
    res.status(500).json({
      success: false,
      message: "Failed to register for contest",
      error: error.message,
    });
  }
};

// Get contest problems (only after contest starts)
export const getContestProblems = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate contest ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid contest ID format",
      });
    }

    // Find the contest
    const contest = await Contest.findById(id);

    if (!contest) {
      return res.status(404).json({
        success: false,
        message: "Contest not found",
      });
    }

    const currentTime = new Date();
    const isAdmin = req.user && req.user.role === "admin";

    // Check if the contest has started or if the user is an admin
    if (currentTime < contest.startTime && !isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Contest has not started yet",
        startTime: contest.startTime,
        currentTime: currentTime,
        timeUntilStart: contest.startTime - currentTime,
      });
    }

    // Check if the contest has ended
    if (currentTime > contest.endTime && !isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Contest has ended",
        endTime: contest.endTime,
      });
    }

    // Check if user is registered for the contest
    const isRegistered = contest.participants.some(
      (participant) => participant.toString() === req.user._id.toString()
    );

    if (!isRegistered && !isAdmin) {
      return res.status(403).json({
        success: false,
        message: "You are not registered for this contest",
      });
    }

    // Find problems by their custom id field
    const problemIds = contest.problems || [];

    // Fetch the problems with complete details (using string id, not ObjectId)
    const problems = await Problem.find({
      id: { $in: problemIds },
    }).select("-testCases.hidden -examples"); // Exclude hidden test cases

    // Process starterCode map for each problem
    const processedProblems = problems.map((problem) => {
      const problemData = problem.toObject();

      // Convert Map to regular object for JSON serialization
      if (problemData.starterCode instanceof Map) {
        problemData.starterCode = Object.fromEntries(problemData.starterCode);
      }

      return problemData;
    });

    // Calculate remaining time
    const timeRemaining = Math.max(0, contest.endTime - currentTime);

    res.status(200).json({
      success: true,
      data: {
        contestId: contest._id,
        contestTitle: contest.title,
        problems: processedProblems,
        startTime: contest.startTime,
        endTime: contest.endTime,
        timeRemaining: timeRemaining,
        duration: contest.duration,
      },
    });
  } catch (error) {
    console.error("Error fetching contest problems:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch contest problems",
      error: error.message,
    });
  }
};

// Submit solution for a contest problem
export const submitSolution = async (req, res) => {
  try {
    const { id: contestId } = req.params;
    const { problemId, code, language } = req.body;
    const userId = req.user._id;

    // Validate required fields
    if (!problemId || !code || !language) {
      return res.status(400).json({
        success: false,
        message: "Problem ID, code, and language are required",
      });
    }

    // Validate contest ID
    if (!mongoose.Types.ObjectId.isValid(contestId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid contest ID format",
      });
    }

    // Find the contest
    const contest = await Contest.findById(contestId);

    if (!contest) {
      return res.status(404).json({
        success: false,
        message: "Contest not found",
      });
    }

    // Check if the contest is currently running
    const currentTime = new Date();
    if (currentTime < contest.startTime || currentTime > contest.endTime) {
      return res.status(403).json({
        success: false,
        message:
          currentTime < contest.startTime
            ? "Contest has not started yet"
            : "Contest has ended",
      });
    }

    // Check if user is registered for the contest
    const isRegistered = contest.participants.some(
      (participant) => participant.toString() === userId.toString()
    );

    if (!isRegistered) {
      return res.status(403).json({
        success: false,
        message: "You are not registered for this contest",
      });
    }

    // After validating the contest
    if (!contest.problems.includes(problemId)) {
      return res.status(400).json({
        success: false,
        message: "This problem is not part of the contest",
      });
    }

    // Find problem using its string id
    const problem = await Problem.findOne({ id: problemId });

    if (!problem) {
      return res.status(404).json({
        success: false,
        message: "Problem not found",
      });
    }

    // Check for existing submission using the problem's ObjectId (_id)
    const existingSubmission = await ContestSubmission.findOne({
      userId,
      contestId,
      problemId: problem._id, // Use MongoDB ObjectId instead of string ID
    });

    // If there's an existing accepted solution, no need to resubmit
    if (existingSubmission && existingSubmission.status === "Accepted") {
      return res.status(200).json({
        success: true,
        message: "You have already solved this problem",
        data: existingSubmission,
      });
    }

    // Get language ID for Judge0
    const languageId = getJudge0LanguageId(language);
    if (!languageId) {
      return res.status(400).json({
        success: false,
        message: "Unsupported programming language",
      });
    }

    // Process each test case with Judge0 API
    const testResults = await Promise.all(
      problem.testCases.map(async (testCase) => {
        try {
          // Create submission for Judge0
          const submissionResponse = await axios.post(
            `${JUDGE0_API_URL}/submissions`,
            {
              source_code: code,
              language_id: languageId,
              stdin: testCase.input,
              expected_output: testCase.expectedOutput,
              cpu_time_limit: 2, // 2 seconds
              memory_limit: 128000, // 128MB
            },
            {
              headers: {
                "Content-Type": "application/json",
                "X-RapidAPI-Key": JUDGE0_API_KEY,
                "X-RapidAPI-Host": JUDGE0_HOST,
              },
            }
          );

          const token = submissionResponse.data.token;

          // Poll for results
          let result;
          let attempts = 0;
          const maxAttempts = 10;

          while (attempts < maxAttempts) {
            await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1 second

            const resultResponse = await axios.get(
              `${JUDGE0_API_URL}/submissions/${token}`,
              {
                headers: {
                  "X-RapidAPI-Key": JUDGE0_API_KEY,
                  "X-RapidAPI-Host": JUDGE0_HOST,
                },
              }
            );

            if (resultResponse.data.status.id > 2) {
              // If not queued or processing
              result = resultResponse.data;
              break;
            }

            attempts++;
          }

          if (!result) {
            throw new Error("Execution timed out");
          }

          return {
            testCaseId: testCase.id,
            input: testCase.input,
            expectedOutput: testCase.expectedOutput,
            actualOutput: result.stdout?.trim() || "",
            status: mapJudge0Status(result.status.id),
            executionTime: result.time,
            memory: result.memory,
            passed: result.status.id === 3, // 3 = Accepted
            hidden: testCase.hidden,
          };
        } catch (error) {
          console.error("Judge0 API error:", error);
          return {
            testCaseId: testCase.id,
            input: testCase.input,
            expectedOutput: testCase.expectedOutput,
            actualOutput: "",
            status: "Judge Error",
            executionTime: 0,
            memory: 0,
            passed: false,
            hidden: testCase.hidden,
          };
        }
      })
    );

    // Calculate submission result
    const passedAll = testResults.every((result) => result.passed);
    const status = passedAll ? "Accepted" : "Wrong Answer";

    // Calculate penalty based on previous failed attempts
    let penalty = 0;
    if (passedAll && existingSubmission) {
      // Apply 20-minute penalty for each previous wrong submission
      penalty = existingSubmission.attempts * 20 * 60 * 1000; // Convert to milliseconds
    }

    // Calculate points based on problem difficulty and execution time
    const points = passedAll ? calculatePoints(problem.difficulty, penalty) : 0;
    // Update problem statistics - FIXED SYNTAX ERROR HERE
    await Problem.findOneAndUpdate(
      { id: problemId },
      {
        $inc: { submissions: 1 },
        $set: {
          acceptance: passedAll
            ? (((problem.acceptance || 0) * (problem.submissions || 0) + 1) /
                ((problem.submissions || 0) + 1)) *
              100
            : (((problem.acceptance || 0) * (problem.submissions || 0)) /
                ((problem.submissions || 0) + 1)) *
              100,
        },
      }
    );

    // Add this after calculating submission result in submitSolution
    // Update contest-specific problem statistics
    const updateQuery = passedAll
      ? {
          $inc: {
            "problemStats.$[elem].submissions": 1,
            "problemStats.$[elem].accepted": 1,
          },
        }
      : { $inc: { "problemStats.$[elem].submissions": 1 } };

    const filterQuery = { "elem.problemId": problemId };

    // Check if stats for this problem already exist in this contest
    const contestWithStats = await Contest.findOne({
      _id: contestId,
      "problemStats.problemId": problemId,
    });

    if (contestWithStats) {
      // Update existing stats
      await Contest.updateOne({ _id: contestId }, updateQuery, {
        arrayFilters: [filterQuery],
      });
    } else {
      // Add new stats for this problem
      await Contest.findByIdAndUpdate(contestId, {
        $push: {
          problemStats: {
            problemId: problemId,
            submissions: 1,
            accepted: passedAll ? 1 : 0,
          },
        },
      });
    }

    // Keep updating global stats too
    await Problem.findOneAndUpdate(
      { id: problemId },
      {
        $inc: { submissions: 1 },
        $set: {
          acceptance: passedAll
            ? (((problem.acceptance || 0) * (problem.submissions || 0) + 1) /
                ((problem.submissions || 0) + 1)) *
              100
            : (((problem.acceptance || 0) * (problem.submissions || 0)) /
                ((problem.submissions || 0) + 1)) *
              100,
        },
      }
    );

    // When creating a new submission, also use the problem's ObjectId
    const submission = new ContestSubmission({
      userId,
      contestId,
      problemId: problem._id, // Use MongoDB ObjectId
      code,
      language,
      status,
      testResults: testResults.filter((r) => !r.hidden), // Don't store hidden test cases results
      executionTime: Math.max(...testResults.map((r) => r.executionTime || 0)),
      memory: Math.max(...testResults.map((r) => r.memory || 0)),
      points,
      penalty,
      attempts: existingSubmission ? existingSubmission.attempts + 1 : 1,
    });

    await submission.save();

    // If this is the first accepted solution for this problem by this user
    if (
      passedAll &&
      (!existingSubmission || existingSubmission.status !== "Accepted")
    ) {
      try {
        // Update leaderboard in real-time
        const updatedLeaderboard = await updateLeaderboardRealTime(
          contestId,
          userId,
          problemId,
          submission,
          req
        );

        // Use app.updateLeaderboard if available (for WebSocket broadcasting)
        if (req && req.app && req.app.updateLeaderboard) {
          req.app.updateLeaderboard(contestId, updatedLeaderboard);
        }

        // Notify other users via WebSocket about the submission
        notifyContestSubmission(
          contestId,
          userId.toString(),
          problemId,
          status
        );
      } catch (error) {
        console.error("Error updating real-time data:", error);
        // Continue execution even if real-time updates fail
      }
    }

    res.status(200).json({
      success: true,
      message: passedAll ? "All test cases passed!" : "Some test cases failed",
      data: {
        submission: {
          id: submission._id,
          status,
          points,
          testResults: testResults
            .filter((r) => !r.hidden) // Filter out hidden test cases
            .map((result) => ({
              ...result,
              input:
                result.input.length > 100
                  ? result.input.substring(0, 100) + "..."
                  : result.input,
              expectedOutput:
                result.expectedOutput.length > 100
                  ? result.expectedOutput.substring(0, 100) + "..."
                  : result.expectedOutput,
              actualOutput:
                result.actualOutput.length > 100
                  ? result.actualOutput.substring(0, 100) + "..."
                  : result.actualOutput,
            })),
        },
      },
    });
  } catch (error) {
    console.error("Error submitting solution:", error);
    res.status(500).json({
      success: false,
      message: "Failed to submit solution",
      error: error.message,
    });
  }
};

// Map Judge0 status codes to our status strings
function mapJudge0Status(statusId) {
  const statusMap = {
    3: "Accepted",
    4: "Wrong Answer",
    5: "Time Limit Exceeded",
    6: "Compilation Error",
    7: "Runtime Error (SIGSEGV)",
    8: "Runtime Error (SIGXFSZ)",
    9: "Runtime Error (SIGFPE)",
    10: "Runtime Error (SIGABRT)",
    11: "Runtime Error (NZEC)",
    12: "Runtime Error (Other)",
    13: "Internal Error",
    14: "Exec Format Error",
  };

  return statusMap[statusId] || "Unknown Error";
}

// Get Judge0 language ID from our language identifier
function getJudge0LanguageId(language) {
  const languageMap = {
    javascript: 63, // JavaScript (Node.js 12.14.0)
    python: 71, // Python (3.8.1)
    java: 62, // Java (OpenJDK 13.0.1)
    cpp: 54, // C++ (GCC 9.2.0)
    c: 50, // C (GCC 9.2.0)
    csharp: 51, // C# (Mono 6.6.0.161)
    ruby: 72, // Ruby (2.7.0)
    go: 60, // Go (1.13.5)
    rust: 73, // Rust (1.40.0)
    php: 68, // PHP (7.4.1)
  };

  return languageMap[language.toLowerCase()];
}

// Calculate points based on problem difficulty
function calculatePoints(difficulty, penalty) {
  const basePoints = {
    Easy: 100,
    Medium: 200,
    Hard: 300,
  };

  // Convert penalty from milliseconds to minutes
  const penaltyMinutes = penalty / (60 * 1000);

  // Base points for the difficulty
  let points = basePoints[difficulty] || 100;

  // Reduce points based on penalty, but never below 25% of base points
  const minPoints = points * 0.25;
  const penaltyDeduction = points * (penaltyMinutes / 120); // 2 hours max penalty

  return Math.max(Math.round(points - penaltyDeduction), minPoints);
}

// Get contest leaderboard
export const getContestLeaderboard = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid contest ID format" });
    }

    const contest = await Contest.findById(id);
    if (!contest) {
      return res
        .status(404)
        .json({ success: false, message: "Contest not found" });
    }

    const submissions = await ContestSubmission.find({
      contestId: id,
      status: "Accepted",
    })
      .populate("userId", "name email username")
      .sort({ createdAt: 1 });

    const problemCount = contest.problems.length;
    const userSubmissions = {};

    submissions.forEach((sub) => {
      const userId = sub.userId._id.toString();

      if (!userSubmissions[userId]) {
        userSubmissions[userId] = {
          user: {
            _id: sub.userId._id,
            name: sub.userId.name,
            name:
              sub.userId.name || sub.userId.name.split(" ")[0].toLowerCase(),
            email: sub.userId.email,
          },
          problemsSolved: new Set(),
          totalPoints: 0,
          totalPenalty: 0,
          lastSubmissionTime: null,
        };
      }

      if (
        !userSubmissions[userId].problemsSolved.has(sub.problemId.toString())
      ) {
        userSubmissions[userId].problemsSolved.add(sub.problemId.toString());
        userSubmissions[userId].totalPoints += sub.points;
        userSubmissions[userId].totalPenalty += sub.penalty;

        if (
          !userSubmissions[userId].lastSubmissionTime ||
          sub.createdAt > userSubmissions[userId].lastSubmissionTime
        ) {
          userSubmissions[userId].lastSubmissionTime = sub.createdAt;
        }
      }
    });

    let leaderboard = Object.values(userSubmissions)
      .map((entry) => ({
        userId: entry.user._id,
        name: entry.user.name,
        name: entry.user.name
          ? entry.user.name.split(" ")[0].toLowerCase()
          : "user",
        problemsSolved: entry.problemsSolved.size,
        problemsSolvedIds: Array.from(entry.problemsSolved),
        totalProblems: problemCount,
        score: entry.totalPoints,
        penalty: entry.totalPenalty,
        lastSubmissionTime: entry.lastSubmissionTime,
      }))
      .sort((a, b) => {
        if (b.problemsSolved !== a.problemsSolved)
          return b.problemsSolved - a.problemsSolved;
        if (b.score !== a.score) return b.score - a.score;
        if (a.penalty !== b.penalty) return a.penalty - b.penalty;
        return a.lastSubmissionTime - b.lastSubmissionTime;
      });

    const previousRanks = contest.previousRanks
      ? Object.fromEntries(contest.previousRanks)
      : {};

    leaderboard = leaderboard.map((entry, index) => {
      const prevRank = previousRanks[entry.userId.toString()];
      let change = "-";
      if (typeof prevRank === "number") {
        const delta = prevRank - (index + 1);
        if (delta > 0) change = `▲${delta}`;
        else if (delta < 0) change = `▼${Math.abs(delta)}`;
      }
      return {
        ...entry,
        rank: index + 1,
        change,
      };
    });

    const currentTime = new Date();
    const isFinished = currentTime > contest.endTime;

    let userRank = null;
    if (req.user) {
      const userEntry = leaderboard.find(
        (entry) => entry.userId.toString() === req.user._id.toString()
      );
      if (userEntry) {
        userRank = {
          rank: userEntry.rank,
          problemsSolved: userEntry.problemsSolved,
          score: userEntry.score,
          penalty: userEntry.penalty,
        };
      }
    }

    if (!contest.leaderboard || contest.leaderboard.length === 0) {
      await Contest.findByIdAndUpdate(id, {
        $set: {
          leaderboard: leaderboard.map((entry) => ({
            userId: entry.userId,
            rank: entry.rank,
            problemsSolved: entry.problemsSolved,
            score: entry.score,
            penalty: entry.penalty,
          })),
        },
      });
    }

    if (!isFinished && req.user && req.session) {
      req.session.contestRoom = `contest-${id}`;
    }

    // Respond first, then update previousRanks
    res.status(200).json({
      success: true,
      data: {
        contest: {
          id: contest._id,
          title: contest.title,
          startTime: contest.startTime,
          endTime: contest.endTime,
          isFinished,
          totalProblems: problemCount,
        },
        leaderboard,
        userRank,
        isRealTime: !isFinished,
      },
    });

    // Update previousRanks AFTER response
    const newPreviousRanks = {};
    leaderboard.forEach((entry) => {
      newPreviousRanks[entry.userId.toString()] = entry.rank;
    });
    contest.previousRanks = newPreviousRanks;
    await contest.save();
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch leaderboard",
      error: error.message,
    });
  }
};

// Update leaderboard via socket (call this after successful submission)
export const updateLeaderboardRealTime = async (
  contestId,
  userId,
  problemId,
  submission,
  req = null
) => {
  try {
    // Only emit update for accepted submissions
    if (submission.status !== "Accepted") return [];

    // Calculate new leaderboard
    const updatedLeaderboard = await calculateContestLeaderboard(contestId);

    // Find user rank
    const userEntry = updatedLeaderboard.find(
      (entry) => entry.userId.toString() === userId.toString()
    );

    // Check if io is properly initialized before using it
    if (io && typeof io.to === "function") {
      // Emit update to all users in the contest room using Socket.io
      io.to(`contest-${contestId}`).emit(
        "leaderboard-update",
        updatedLeaderboard
      );
    } else {
      console.log("Socket.io instance not available for real-time updates");
    }

    return updatedLeaderboard;
  } catch (error) {
    console.error("Error updating real-time leaderboard:", error);
    return [];
  }
};

// Helper function to calculate contest leaderboard
export const calculateContestLeaderboard = async (contestId) => {
  // Find the contest
  const contest = await Contest.findById(contestId);
  if (!contest) throw new Error("Contest not found");

  // Get all accepted submissions
  const submissions = await ContestSubmission.find({
    contestId,
    status: "Accepted",
  })
    .populate("userId", "name")
    .sort({ createdAt: 1 });

  // Group by user
  const userSubmissions = {};

  submissions.forEach((sub) => {
    const userId = sub.userId._id.toString();

    if (!userSubmissions[userId]) {
      userSubmissions[userId] = {
        userId,
        name: sub.userId.name,
        problemsSolved: new Set(),
        score: 0,
        penalty: 0,
        lastSubmissionTime: null,
      };
    }

    if (!userSubmissions[userId].problemsSolved.has(sub.problemId.toString())) {
      userSubmissions[userId].problemsSolved.add(sub.problemId.toString());
      userSubmissions[userId].score += sub.points;
      userSubmissions[userId].penalty += sub.penalty;

      if (
        !userSubmissions[userId].lastSubmissionTime ||
        sub.createdAt > userSubmissions[userId].lastSubmissionTime
      ) {
        userSubmissions[userId].lastSubmissionTime = sub.createdAt;
      }
    }
  });

  // Convert to array and sort
  let leaderboard = Object.values(userSubmissions)
    .map((entry) => ({
      userId: entry.userId,
      name: entry.name,
      problemsSolved: Array.from(entry.problemsSolved),
      score: entry.score,
      penalty: entry.penalty,
    }))
    .sort((a, b) => {
      if (b.problemsSolved.length !== a.problemsSolved.length) {
        return b.problemsSolved.length - a.problemsSolved.length;
      }
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return a.penalty - b.penalty;
    });

  // Add ranks
  leaderboard = leaderboard.map((entry, index) => ({
    ...entry,
    rank: index + 1,
  }));

  return leaderboard;
};

// Finalize contest and calculate ratings
export const finalizeContest = async (req, res) => {
  try {
    const { id: contestId } = req.params;

    // Validate contest ID
    if (!mongoose.Types.ObjectId.isValid(contestId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid contest ID format",
      });
    }

    const contest = await Contest.findById(contestId);
    if (!contest) {
      return res.status(404).json({
        success: false,
        message: "Contest not found",
      });
    }

    // Check if contest is already finalized
    if (contest.isFinalized) {
      return res.status(400).json({
        success: false,
        message: "Contest is already finalized",
      });
    }

    // Get the leaderboard data
    const leaderboard = await calculateContestLeaderboard(contestId);

    // Fetch current ratings for all participants
    const participants = await User.find({
      _id: { $in: contest.participants },
    }).select("_id name rating");

    // Prepare data for rating calculation
    const participantsWithRatings = leaderboard.map((entry) => {
      const participant = participants.find(
        (p) => p._id.toString() === entry.userId
      );

      return {
        userId: entry.userId,
        score: entry.score,
        rating: participant.rating ? participant.rating : 1500, // Default rating if not found
      };
    });

    // Calculate new ratings
    const newRatings = calculateContestRatings(participantsWithRatings);

    // Update ratings in user profiles and store rating changes in contest
    const ratingChanges = [];

    for (const participant of newRatings) {
      // Update user rating

      const oldRating =
        typeof participant.oldRating === "number" &&
        !isNaN(participant.oldRating)
          ? participant.oldRating
          : 1500;
      const newRating =
        typeof participant.newRating === "number" &&
        !isNaN(participant.newRating)
          ? participant.newRating
          : oldRating;
      const ratingChange =
        typeof participant.ratingChange === "number" &&
        !isNaN(participant.ratingChange)
          ? participant.ratingChange
          : 0;

      await User.findByIdAndUpdate(participant.userId, {
        $set: { rating: newRating },
      });

      // Store rating change
      ratingChanges.push({
        userId: participant.userId,
        oldRating,
        newRating,
        change: ratingChange,
      });
    }

    // Update contest with rating changes and mark as finalized
    await Contest.findByIdAndUpdate(contestId, {
      $set: {
        ratingChanges,
        isFinalized: true,
      },
    });

    // Broadcast final results to connected clients
    if (io && typeof io.to === "function") {
      io.to(`contest-${contestId}`).emit("leaderboard-update", leaderboard);
    }
    return res.status(200).json({
      success: true,
      message: "Contest finalized successfully",
      data: {
        leaderboard,
        ratingChanges,
      },
    });
  } catch (error) {
    console.error("Error finalizing contest:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to finalize contest",
      error: error.message,
    });
  }
};

export const getContestRating = async (req, res) => {
  try {
    const { _id } = req.user;

    // Validate user ID
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID format",
      });
    }

    // Fetch user with only the rating field
    const user = await User.findById(_id).select("rating");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Use default rating if not present
    const rating = typeof user.rating === "number" ? user.rating : 1500;

    return res.status(200).json({
      success: true,
      data: {
        rating,
      },
    });
  } catch (error) {
    console.error("Error fetching contest rating:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch rating",
      error: error.message,
    });
  }
};

// Add this function to your contestController.js
export const getContestProblem = async (req, res) => {
  try {
    const { contestId, problemId } = req.params;

    // Verify the contest exists
    const contest = await Contest.findById(contestId);
    if (!contest) {
      return res.status(404).json({
        success: false,
        message: "Contest not found",
      });
    }

    // Check if the user is registered for this contest
    if (!contest.participants.includes(req.user.id)) {
      return res.status(403).json({
        success: false,
        message: "You are not registered for this contest",
      });
    }

    // Check if contest is running or finished
    const currentStatus = contest.getCurrentStatus();
    if (currentStatus === "upcoming") {
      return res.status(403).json({
        success: false,
        message: "Contest has not started yet",
      });
    }

    // IMPORTANT CHANGE: Find the problem by _id (MongoDB ObjectId), not string id field
    // This is needed because the URL contains MongoDB ObjectIDs
    const problem = await Problem.findById(problemId);

    if (!problem) {
      return res.status(404).json({
        success: false,
        message: "Problem not found",
      });
    }

    // Check if problem belongs to this contest (check if contest.problems contains the problem id)
    if (!contest.problems.includes(problem.id)) {
      return res.status(404).json({
        success: false,
        message: "Problem not found in this contest",
      });
    }

    // Process the problem data for the response
    const problemData = problem.toObject();

    // Ensure constraints is an array
    if (typeof problemData.constraints === "string") {
      problemData.constraints = problemData.constraints
        .split("\n")
        .filter((line) => line.trim() !== "");
    }

    // Convert starterCode Map to a regular object for JSON serialization
    if (problemData.starterCode instanceof Map) {
      problemData.starterCode = Object.fromEntries(problemData.starterCode);
    }

    // In getContestProblem function, before returning the response:
    // Get contest-specific problem statistics
    const contestProblemStats = contest.problemStats?.find(
      (ps) => ps.problemId === problem.id
    );

    // Calculate contest-specific acceptance rate
    let contestAcceptanceRate = 0;
    let contestSubmissions = 0;

    if (contestProblemStats) {
      contestSubmissions = contestProblemStats.submissions || 0;
      if (contestSubmissions > 0) {
        contestAcceptanceRate =
          ((contestProblemStats.accepted || 0) / contestSubmissions) * 100;
      }
    }

    // Add contest-specific stats to problem data
    problemData.contestSubmissions = contestSubmissions;
    problemData.contestAcceptance = contestAcceptanceRate.toFixed(1);

    return res.status(200).json({
      success: true,
      data: problemData,
    });
  } catch (error) {
    console.error("Error fetching contest problem:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch problem details",
      error: error.message,
    });
  }
};

// Run code for a contest problem without submission
export const runContestProblem = async (req, res) => {
  try {
    const { contestId, problemId } = req.params;
    const { code, language } = req.body;
    const userId = req.user._id;

    // Validate required fields
    if (!code || !language) {
      return res.status(400).json({
        success: false,
        message: "Code and language are required",
      });
    }

    // Validate contest ID
    if (!mongoose.Types.ObjectId.isValid(contestId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid contest ID format",
      });
    }

    // Find the contest
    const contest = await Contest.findById(contestId);

    if (!contest) {
      return res.status(404).json({
        success: false,
        message: "Contest not found",
      });
    }

    // Check if the user is registered for this contest
    const isRegistered = contest.participants.some(
      (participant) => participant.toString() === userId.toString()
    );

    if (!isRegistered && req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "You are not registered for this contest",
      });
    }

    // Find the problem by ID (using ObjectId)
    const problem = await Problem.findById(problemId);

    if (!problem) {
      return res.status(404).json({
        success: false,
        message: "Problem not found",
      });
    }

    // Get language ID for Judge0
    const languageId = getJudge0LanguageId(language);
    if (!languageId) {
      return res.status(400).json({
        success: false,
        message: "Unsupported programming language",
      });
    }

    // Only use visible test cases for run (not hidden)
    const visibleTestCases = problem.testCases.filter((tc) => !tc.hidden);

    if (visibleTestCases.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No visible test cases found for this problem",
      });
    }

    // Process each test case with Judge0 API
    const testResults = await Promise.all(
      visibleTestCases.map(async (testCase) => {
        try {
          // Create submission for Judge0
          const submissionResponse = await axios.post(
            `${JUDGE0_API_URL}/submissions`,
            {
              source_code: code,
              language_id: languageId,
              stdin: testCase.input,
              expected_output: testCase.expectedOutput,
              cpu_time_limit: 2, // 2 seconds
              memory_limit: 128000, // 128MB
            },
            {
              headers: {
                "Content-Type": "application/json",
                "X-RapidAPI-Key": JUDGE0_API_KEY,
                "X-RapidAPI-Host": JUDGE0_HOST,
              },
            }
          );

          const token = submissionResponse.data.token;

          // Poll for results
          let result;
          let attempts = 0;
          const maxAttempts = 10;

          while (attempts < maxAttempts) {
            await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1 second

            const resultResponse = await axios.get(
              `${JUDGE0_API_URL}/submissions/${token}`,
              {
                headers: {
                  "X-RapidAPI-Key": JUDGE0_API_KEY,
                  "X-RapidAPI-Host": JUDGE0_HOST,
                },
              }
            );

            if (resultResponse.data.status.id > 2) {
              // If not queued or processing
              result = resultResponse.data;
              break;
            }

            attempts++;
          }

          if (!result) {
            throw new Error("Execution timed out");
          }

          return {
            testCaseId: testCase.id,
            input: testCase.input,
            expectedOutput: testCase.expectedOutput,
            actualOutput: result.stdout?.trim() || "",
            status: mapJudge0Status(result.status.id),
            executionTime: result.time,
            memory: result.memory,
            passed: result.status.id === 3, // 3 = Accepted
            error: result.stderr || result.compile_output || null,
          };
        } catch (error) {
          console.error("Judge0 API error:", error);
          return {
            testCaseId: testCase.id,
            input: testCase.input,
            expectedOutput: testCase.expectedOutput,
            actualOutput: "",
            status: "Judge Error",
            executionTime: 0,
            memory: 0,
            passed: false,
            error:
              error.message || "Unknown error occurred during code execution",
          };
        }
      })
    );

    // Calculate overall result
    const passedAll = testResults.every((result) => result.passed);
    const passedCount = testResults.filter((result) => result.passed).length;

    return res.status(200).json({
      success: true,
      message: passedAll
        ? `All ${passedCount} test cases passed!`
        : `${passedCount}/${testResults.length} test cases passed`,
      data: {
        testResults: testResults.map((result) => ({
          ...result,
          input:
            result.input.length > 1000
              ? result.input.substring(0, 1000) + "..."
              : result.input,
          expectedOutput:
            result.expectedOutput.length > 1000
              ? result.expectedOutput.substring(0, 1000) + "..."
              : result.expectedOutput,
          actualOutput:
            result.actualOutput.length > 1000
              ? result.actualOutput.substring(0, 1000) + "..."
              : result.actualOutput,
        })),
      },
    });
  } catch (error) {
    console.error("Error running code:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to run code",
      error: error.message,
    });
  }
};

export const getContestResults = async (req, res) => {
  try {
    const { contestId } = req.params;

    // Fetch contest info
    const contest = await Contest.findById(contestId);
    if (!contest) {
      return res.status(404).json({
        success: false,
        message: "Contest not found",
      });
    }

    // Make sure the contest is finished
    if (contest.getCurrentStatus() !== "finished") {
      return res.status(400).json({
        success: false,
        message: "Results are only available for finished contests",
      });
    }

    // ADD THIS CODE: Fetch all submissions for this contest
    const submissions = await ContestSubmission.find({
      contestId,
      status: "Accepted",
    }).sort({ createdAt: 1 });

    // Calculate leaderboard if not already stored
    let leaderboard = contest.leaderboard || [];
    if (leaderboard.length === 0) {
      // If leaderboard isn't stored, calculate it
      leaderboard = await calculateContestLeaderboard(contestId);

      // Store leaderboard for future use
      await Contest.findByIdAndUpdate(contestId, {
        $set: { leaderboard },
      });
    }

    // Create problem ID mapping including both MongoDB IDs and custom IDs
    const problemsByMongoId = {};
    // Fetch problem statistics

    const allProblems = await Promise.all(
      contest.problems.map(async (problemId) => {
        const problem = await Problem.findOne({ id: problemId });
        if (problem) {
          // Store mapping of MongoDB ID to custom ID
          problemsByMongoId[problem._id.toString()] = problem.id;
          return problem;
        }
        return null;
      })
    );

    const problems = await Promise.all(
      contest.problems.map(async (problemId) => {
        const problem = await Problem.findOne({ id: problemId });

        // Get contest-specific statistics from problemStats array
        const problemStat = contest.problemStats?.find(
          (ps) => ps.problemId === problemId
        ) || {
          submissions: 0,
          accepted: 0,
        };

        // Calculate acceptance rate for this contest
        const contestAcceptance =
          problemStat.submissions > 0
            ? ((problemStat.accepted / problemStat.submissions) * 100).toFixed(
                1
              )
            : "0.0";

        return {
          id: problem.id,
          title: problem.title,
          difficulty: problem.difficulty,
          acceptance: contestAcceptance, // Contest-specific acceptance rate
          submissions: problemStat.submissions, // Contest-specific submission count
          // You could also include global stats if desired
          globalAcceptance: problem.acceptance,
          globalSubmissions: problem.submissions,
        };
      })
    );

    // Create a mapping of problem IDs to letters/positions
    const problemMap = {};
    contest.problems.forEach((problemId, index) => {
      problemMap[problemId] = {
        id: problemId,
        letter: String.fromCharCode(65 + index), // A, B, C, etc.
        position: index + 1,
      };
    });

    // Update leaderboard entries to include problem information
    const enhancedLeaderboard = leaderboard.map((entry) => {
      let problemDetails = [];
      let timeTaken = "-";

      // Get submission details for this user
      const userSubmissions = submissions
        .filter(
          (sub) =>
            sub.userId.toString() === entry.userId.toString() &&
            sub.status === "Accepted"
        )
        .sort((a, b) => a.createdAt - b.createdAt);

      // Calculate time taken if there are submissions
      if (userSubmissions.length > 0) {
        const firstSubmission = userSubmissions[0];
        const lastSubmission = userSubmissions[userSubmissions.length - 1];

        // Calculate from contest start to last accepted submission
        const startTime = new Date(contest.startTime);
        const endTime = new Date(lastSubmission.createdAt);

        // Calculate difference in minutes
        const diffMs = endTime - startTime;
        const minutes = Math.floor(diffMs / 60000);
        const hours = Math.floor(minutes / 60);

        timeTaken = hours > 0 ? `${hours}h ${minutes % 60}m` : `${minutes}m`;
      }

      if (Array.isArray(entry.problemsSolved)) {
        problemDetails = entry.problemsSolved.map((problemId) => {
          // Try to match by MongoDB ID first, then convert to custom ID
          const customId = problemsByMongoId[problemId] || problemId;

          // Then look up problem details by custom ID
          const problem = problemMap[customId] || {
            id: customId,
            letter: "?",
            position: 0,
          };

          return problem;
        });
      }

      return {
        ...entry,
        problemsSolved: problemDetails,
        timeTaken: timeTaken,
      };
    });

    return res.status(200).json({
      success: true,
      data: {
        contestId,
        title: contest.title,
        startTime: contest.startTime,
        endTime: contest.endTime,
        participants: contest.participants.length,
        problems,
        leaderboard: enhancedLeaderboard,
        problemMap,
      },
    });
  } catch (error) {
    console.error("Error fetching contest results:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch contest results",
    });
  }
};

export function startContestFinalizationCron(app) {
  setInterval(async () => {
    try {
      const now = new Date();
      const contestsToFinalize = await Contest.find({
        endTime: { $lt: now },
        isFinalized: { $ne: true },
      });
      for (const contest of contestsToFinalize) {
        const req = {
          params: { id: contest._id },
          user: { role: "admin" },
          app,
        };
        const res = {
          status: () => ({ json: () => {} }),
          json: () => {},
        };
        await finalizeContest(req, res);
        console.log(`Finalized contest: ${contest.title} (${contest._id})`);
      }
    } catch (err) {
      console.error("Error in contest finalization cron job:", err);
    }
  }, 60 * 1000);
}
