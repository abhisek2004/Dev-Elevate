import Quiz from "../model/Quiz.js";
import QuizAttempt from "../model/QuizAttempt.js";

// Get all available quizzes for users
export const getUserQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find()
      .select("title topic difficulty type createdAt questions isAIGenerated")
      .lean();

    const quizzesWithCount = quizzes.map(quiz => ({
      _id: quiz._id,
      title: quiz.title,
      topic: quiz.topic,
      difficulty: quiz.difficulty,
      type: quiz.type,
      createdAt: quiz.createdAt,
      questionCount: quiz.questions?.length || 0,
      isAIGenerated: quiz.isAIGenerated || false
    }));

    res.status(200).json(quizzesWithCount);
  } catch (error) {
    console.error("Error fetching user quizzes:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get quiz by ID for attempting (without correct answers)
export const getQuizForAttempt = async (req, res) => {
  try {
    const { quizId } = req.params;
    const quiz = await Quiz.findById(quizId).lean();

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    // Remove correct answers from questions for security
    const sanitizedQuestions = quiz.questions.map(q => {
      if (quiz.type === "MCQ") {
        return {
          _id: q._id,
          questionText: q.questionText,
          options: q.options
        };
      } else {
        return {
          _id: q._id,
          questionText: q.questionText
        };
      }
    });

    res.status(200).json({
      _id: quiz._id,
      title: quiz.title,
      topic: quiz.topic,
      difficulty: quiz.difficulty,
      type: quiz.type,
      isAIGenerated: quiz.isAIGenerated || false,
      questions: sanitizedQuestions
    });
  } catch (error) {
    console.error("Error fetching quiz for attempt:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Submit quiz attempt
export const submitQuizAttempt = async (req, res) => {
  try {
    const { quizId } = req.params;
    const { answers, timeTaken } = req.body;
    const userId = req.user.id || req.user._id;

    if (!answers || !Array.isArray(answers)) {
      return res.status(400).json({ message: "Invalid answers format" });
    }

    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    let score = 0;
    const processedAnswers = [];

    // Calculate score for each answer
    for (const answer of answers) {
      const question = quiz.questions.id(answer.questionId);
      if (!question) continue;

      let isCorrect = false;
      if (quiz.type === 'MCQ') {
        isCorrect = answer.userAnswer === question.correctAnswer;
      } else if (quiz.type === 'Code') {
        // For code questions, basic string comparison
        // You can enhance this with more sophisticated checking
        isCorrect = answer.userAnswer?.trim() === question.expectedOutput?.trim();
      }

      if (isCorrect) score++;

      processedAnswers.push({
        questionId: answer.questionId,
        userAnswer: answer.userAnswer,
        isCorrect
      });
    }

    const quizAttempt = new QuizAttempt({
      userId,
      quizId,
      answers: processedAnswers,
      score,
      totalQuestions: quiz.questions.length,
      timeTaken: timeTaken || 0
    });

    await quizAttempt.save();

    res.status(201).json({
      message: "Quiz submitted successfully",
      score,
      totalQuestions: quiz.questions.length,
      percentage: Math.round((score / quiz.questions.length) * 100),
      timeTaken: timeTaken || 0
    });
  } catch (error) {
    console.error("Error submitting quiz attempt:", error);
    res.status(500).json({ 
      message: "Internal Server Error",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get user's quiz attempts
export const getUserQuizAttempts = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;
    
    const attempts = await QuizAttempt.find({ userId })
      .populate({
        path: 'quizId',
        select: 'title topic difficulty type isAIGenerated questions'
      })
      .sort({ createdAt: -1 })
      .lean();

    // Filter out attempts where quiz was deleted and add questionCount
    const validAttempts = attempts
      .filter(attempt => attempt.quizId)
      .map(attempt => ({
        ...attempt,
        quizId: {
          ...attempt.quizId,
          questionCount: attempt.quizId.questions?.length || attempt.totalQuestions,
          questions: undefined // Remove questions from response
        }
      }));

    res.status(200).json(validAttempts);
  } catch (error) {
    console.error("Error fetching user quiz attempts:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const deleteAIQuiz = async (req, res) => {
  try {
    const { quizId } = req.params;
    const userId = req.user.id; // From auth middleware

    // Find the quiz
    const quiz = await Quiz.findById(quizId);
    
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    // Only allow deleting AI-generated quizzes
    if (!quiz.isAIGenerated) {
      return res.status(403).json({ message: "Can only delete AI-generated quizzes" });
    }

    // Delete the quiz
    await Quiz.findByIdAndDelete(quizId);
    
    // Also delete all attempts for this quiz
    const QuizAttempt = (await import("../model/QuizAttempt.js")).default;
    await QuizAttempt.deleteMany({ quizId: quizId });

    res.status(200).json({ message: "Quiz deleted successfully" });
  } catch (error) {
    console.error("Error deleting quiz:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};