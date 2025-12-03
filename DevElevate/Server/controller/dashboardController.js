import User from "../model/UserModel.js";
import VisitingWebsite from "../model/VisitingWebsite.js";
import SkillAssessment from "../model/SkillAssessment.js";
import QuizAttempt from "../model/QuizAttempt.js";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openaiClient =
  process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== ""
    ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
    : null;

// Helper function to get user streak data
const getUserStreakData = async (userId) => {
  try {
    const streakData = await VisitingWebsite.find({ user: userId })
      .sort({ dateOfVisiting: -1 })
      .limit(30); // Get last 30 days

    // Calculate current streak
    let currentStreak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Check if user visited today
    const visitedToday = streakData.some((visit) => {
      const visitDate = new Date(visit.dateOfVisiting);
      visitDate.setHours(0, 0, 0, 0);
      return visitDate.getTime() === today.getTime();
    });

    if (visitedToday) {
      currentStreak = 1;
      let currentDate = new Date(today);
      currentDate.setDate(currentDate.getDate() - 1);

      // Count consecutive days
      while (true) {
        const found = streakData.some((visit) => {
          const visitDate = new Date(visit.dateOfVisiting);
          visitDate.setHours(0, 0, 0, 0);
          return visitDate.getTime() === currentDate.getTime();
        });

        if (found) {
          currentStreak++;
          currentDate.setDate(currentDate.getDate() - 1);
        } else {
          break;
        }
      }
    }

    return {
      currentStreak,
      totalVisits: streakData.length,
      streakData,
    };
  } catch (error) {
    console.error("Error fetching streak data:", error);
    return {
      currentStreak: 0,
      totalVisits: 0,
      streakData: [],
    };
  }
};

// Helper function to get user quiz performance
const getUserQuizPerformance = async (userId) => {
  try {
    const quizAttempts = await QuizAttempt.find({ userId })
      .populate("quizId")
      .sort({ createdAt: -1 })
      .limit(10);

    const totalQuizzes = quizAttempts.length;
    const totalScore = quizAttempts.reduce(
      (sum, attempt) => sum + attempt.score,
      0
    );
    const averageScore =
      totalQuizzes > 0 ? Math.round(totalScore / totalQuizzes) : 0;

    // Count high scores (90% and above)
    const highScores = quizAttempts.filter(
      (attempt) => attempt.score >= 90
    ).length;

    return {
      totalQuizzes,
      averageScore,
      highScores,
      recentAttempts: quizAttempts.slice(0, 5), // Last 5 attempts
    };
  } catch (error) {
    console.error("Error fetching quiz data:", error);
    return {
      totalQuizzes: 0,
      averageScore: 0,
      highScores: 0,
      recentAttempts: [],
    };
  }
};

// Helper function to get user assessment data
const getUserAssessmentData = async (userId) => {
  try {
    const assessments = await SkillAssessment.find({
      userId,
      status: "completed",
    })
      .sort({ completedAt: -1 })
      .limit(5);

    const totalAssessments = assessments.length;

    // Get skill levels distribution
    const skillLevels = {
      Beginner: 0,
      Intermediate: 0,
      Advanced: 0,
    };

    assessments.forEach((assessment) => {
      if (skillLevels.hasOwnProperty(assessment.skillLevel)) {
        skillLevels[assessment.skillLevel]++;
      }
    });

    // Get improvement areas
    const allImprovementAreas = assessments.flatMap(
      (assessment) => assessment.improvementAreas || []
    );
    const uniqueAreas = [...new Set(allImprovementAreas)];

    return {
      totalAssessments,
      skillLevels,
      favoriteTopics: uniqueAreas.slice(0, 3),
      recentAssessments: assessments.slice(0, 3),
    };
  } catch (error) {
    console.error("Error fetching assessment data:", error);
    return {
      totalAssessments: 0,
      skillLevels: { Beginner: 0, Intermediate: 0, Advanced: 0 },
      favoriteTopics: [],
      recentAssessments: [],
    };
  }
};

// Helper function to analyze learning patterns
const analyzeLearningPatterns = (streakData, quizData, assessmentData) => {
  // Peak learning time analysis (based on visit times)
  const hourCounts = {};
  streakData.streakData.forEach((visit) => {
    const hour = new Date(visit.dateOfVisiting).getHours();
    hourCounts[hour] = (hourCounts[hour] || 0) + 1;
  });

  let peakHour = null;
  let maxCount = 0;
  for (const [hour, count] of Object.entries(hourCounts)) {
    if (count > maxCount) {
      maxCount = count;
      peakHour = parseInt(hour);
    }
  }

  // Determine favorite topic
  let favoriteTopic = "General";
  if (assessmentData.favoriteTopics.length > 0) {
    favoriteTopic = assessmentData.favoriteTopics[0];
  }

  // Weekly goal progress (simplified)
  const weeklyGoal = 5; // Target 5 learning sessions per week
  const currentProgress = Math.min(streakData.currentStreak, weeklyGoal);
  const goalPercentage = Math.round((currentProgress / weeklyGoal) * 100);

  return {
    peakLearningTime:
      peakHour !== null
        ? `${peakHour}:00 - ${peakHour + 2}:00`
        : "Not enough data",
    favoriteTopic,
    weeklyGoalProgress: `${goalPercentage}% Completed`,
    learningStreak: `${streakData.currentStreak} Days`,
  };
};

// Generate AI-powered project recommendations
const generateProjectRecommendations = async (userData) => {
  if (!openaiClient) {
    // Return mock data if OpenAI is not configured
    return [
      {
        id: "1",
        title: "E-commerce Dashboard",
        description:
          "Build a comprehensive dashboard for an online store with sales analytics.",
        difficulty: "Intermediate",
        techStack: ["React", "Node.js", "MongoDB"],
        estimatedTime: "2-3 weeks",
        tags: ["fullstack", "dashboard", "ecommerce"],
      },
      {
        id: "2",
        title: "Task Management App",
        description:
          "Create a productivity app with drag-and-drop task boards and team collaboration.",
        difficulty:
          userData.quizData.averageScore > 70 ? "Intermediate" : "Beginner",
        techStack: ["React", "Firebase"],
        estimatedTime: "1-2 weeks",
        tags: ["productivity", "collaboration"],
      },
      {
        id: "3",
        title: "AI Chat Interface",
        description:
          "Design a modern chat interface integrated with OpenAI API for smart conversations.",
        difficulty: "Advanced",
        techStack: ["React", "Node.js", "OpenAI"],
        estimatedTime: "3-4 weeks",
        tags: ["ai", "chatbot", "api"],
      },
    ];
  }

  try {
    // Determine skill level based on user data
    let skillLevel = "Beginner";
    if (
      userData.quizData.averageScore >= 80 ||
      userData.assessmentData.skillLevels.Advanced > 0
    ) {
      skillLevel = "Advanced";
    } else if (
      userData.quizData.averageScore >= 60 ||
      userData.assessmentData.skillLevels.Intermediate > 0
    ) {
      skillLevel = "Intermediate";
    }

    // Determine interests based on topics
    const interests =
      userData.assessmentData.favoriteTopics.length > 0
        ? userData.assessmentData.favoriteTopics
        : ["Web Development"];

    const prompt = `
Generate 3 project recommendations for a ${skillLevel} level developer interested in ${interests.join(
      ", "
    )}.
Each project should include:
- A catchy title
- A brief description (1 sentence)
- Difficulty level (${skillLevel})
- Tech stack (3-5 technologies)
- Estimated completion time
- Relevant tags (3-4 tags)

Return ONLY valid JSON in this exact format:
[
  {
    "id": "1",
    "title": "Project Title",
    "description": "Brief description",
    "difficulty": "Beginner|Intermediate|Advanced",
    "techStack": ["Tech1", "Tech2", "Tech3"],
    "estimatedTime": "1-2 weeks",
    "tags": ["tag1", "tag2", "tag3"]
  }
]
`;

    const response = await openaiClient.chat.completions.create({
      model: process.env.OPENAI_ASSESSMENT_MODEL?.trim() || "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful coding mentor that suggests project ideas for developers.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      response_format: { type: "json_object" },
    });

    if (
      response.choices &&
      response.choices[0] &&
      response.choices[0].message
    ) {
      const content = response.choices[0].message.content;
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }

    throw new Error("Invalid response format");
  } catch (error) {
    console.error("Error generating project recommendations:", error);
    // Return mock data as fallback
    return [
      {
        id: "1",
        title: "E-commerce Dashboard",
        description:
          "Build a comprehensive dashboard for an online store with sales analytics.",
        difficulty: "Intermediate",
        techStack: ["React", "Node.js", "MongoDB"],
        estimatedTime: "2-3 weeks",
        tags: ["fullstack", "dashboard", "ecommerce"],
      },
      {
        id: "2",
        title: "Task Management App",
        description:
          "Create a productivity app with drag-and-drop task boards and team collaboration.",
        difficulty: "Beginner",
        techStack: ["React", "Firebase"],
        estimatedTime: "1-2 weeks",
        tags: ["productivity", "collaboration"],
      },
      {
        id: "3",
        title: "AI Chat Interface",
        description:
          "Design a modern chat interface integrated with OpenAI API for smart conversations.",
        difficulty: "Advanced",
        techStack: ["React", "Node.js", "OpenAI"],
        estimatedTime: "3-4 weeks",
        tags: ["ai", "chatbot", "api"],
      },
    ];
  }
};

// Generate AI-powered learning insights
const generateLearningInsights = async (userData) => {
  // In a real implementation, this would use OpenAI to generate personalized insights
  // For now, we'll return structured data based on user metrics

  return {
    peakLearningTime: userData.patterns.peakLearningTime,
    favoriteTopic: userData.patterns.favoriteTopic,
    weeklyGoalProgress: userData.patterns.weeklyGoalProgress,
    learningStreak: userData.patterns.learningStreak,
  };
};

// Generate AI-powered achievements
const generateAchievements = async (userData) => {
  const achievements = [
    {
      id: "1",
      title: "First Steps",
      description: "Complete your first lesson",
      earned: userData.streakData.totalVisits > 0,
      dateEarned:
        userData.streakData.totalVisits > 0
          ? new Date().toISOString().split("T")[0]
          : null,
    },
    {
      id: "2",
      title: "Streak Master",
      description: "Maintain a 7-day learning streak",
      earned: userData.streakData.currentStreak >= 7,
      dateEarned:
        userData.streakData.currentStreak >= 7
          ? new Date().toISOString().split("T")[0]
          : null,
    },
    {
      id: "3",
      title: "Quiz Champion",
      description: "Score 90% or higher on 5 quizzes",
      earned: userData.quizData.highScores >= 5,
      dateEarned:
        userData.quizData.highScores >= 5
          ? new Date().toISOString().split("T")[0]
          : null,
    },
    {
      id: "4",
      title: "Polyglot",
      description: "Complete courses in 3 different tracks",
      earned: userData.assessmentData.favoriteTopics.length >= 3,
      dateEarned:
        userData.assessmentData.favoriteTopics.length >= 3
          ? new Date().toISOString().split("T")[0]
          : null,
    },
    {
      id: "5",
      title: "Night Owl",
      description: "Complete a lesson after 10 PM",
      earned:
        userData.patterns.peakLearningTime.includes("22:") ||
        userData.patterns.peakLearningTime.includes("23:"),
      dateEarned:
        userData.patterns.peakLearningTime.includes("22:") ||
        userData.patterns.peakLearningTime.includes("23:")
          ? new Date().toISOString().split("T")[0]
          : null,
    },
  ];

  return achievements;
};

// Main controller function to get all dashboard data
export const getDashboardData = async (req, res) => {
  try {
    if (!req.user?._id) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    const userId = req.user._id;

    // Fetch all user data in parallel
    const [streakData, quizData, assessmentData] = await Promise.all([
      getUserStreakData(userId),
      getUserQuizPerformance(userId),
      getUserAssessmentData(userId),
    ]);

    // Analyze learning patterns
    const patterns = analyzeLearningPatterns(
      streakData,
      quizData,
      assessmentData
    );

    // Package user data
    const userData = {
      streakData,
      quizData,
      assessmentData,
      patterns,
    };

    // Generate dynamic content (these would typically use OpenAI in a full implementation)
    const [achievements, insights, projectRecommendations] = await Promise.all([
      generateAchievements(userData),
      generateLearningInsights(userData),
      generateProjectRecommendations(userData),
    ]);

    return res.status(200).json({
      success: true,
      data: {
        achievements,
        insights,
        projectRecommendations,
        userData, // For debugging purposes
      },
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard data. Please try again later.",
    });
  }
};

export default {
  getDashboardData,
};
