import Quiz from "../model/Quiz.js";
import QuizAttempt from "../model/QuizAttempt.js";

// Get all available quizzes for users
export const getUserQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find()
      .select("title topic difficulty type createdAt questions")
      .lean();

    const quizzesWithCount = quizzes.map(quiz => ({
      ...quiz,
      questionCount: quiz.questions?.length || 0,
      questions: undefined // Remove questions from response for security
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
    const sanitizedQuestions = quiz.questions.map(q => ({
      _id: q._id,
      questionText: q.questionText,
      options: q.options,
      // Don't send correctAnswer or expectedOutput
    }));

    res.status(200).json({
      ...quiz,
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
    const userId = req.user.id;

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
        // For code questions, you might want to implement more sophisticated checking
        isCorrect = answer.userAnswer.trim() === question.expectedOutput?.trim();
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
      timeTaken
    });

    await quizAttempt.save();

    res.status(201).json({
      message: "Quiz submitted successfully",
      score,
      totalQuestions: quiz.questions.length,
      percentage: Math.round((score / quiz.questions.length) * 100),
      timeTaken
    });
  } catch (error) {
    console.error("Error submitting quiz attempt:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get user's quiz attempts
export const getUserQuizAttempts = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const attempts = await QuizAttempt.find({ userId })
      .populate('quizId', 'title topic difficulty type')
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json(attempts);
  } catch (error) {
    console.error("Error fetching user quiz attempts:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};