import QuizAttempt from "../model/QuizAttempt.js";
import Quiz from "../model/Quiz.js";

export const getAllSubmissionsDetailed = async (req, res) => {
  try {
    const quizzes = await Quiz.find();

    if (!quizzes || quizzes.length === 0) {
      return res.status(200).json({ message: "No quizzes found", submissions: [] });
    }

    const results = [];

    for (const quiz of quizzes) {
      if (!quiz._id || !Array.isArray(quiz.questions)) continue;

      const submissions = await QuizAttempt.find({ quizId: quiz._id }).populate("userId", "name email");

      if (!submissions || submissions.length === 0) {
        results.push({
          quiz: quiz.title,
          quizId: quiz._id,
          topic: quiz.topic || "N/A",
          type: quiz.type || "N/A",
          message: "No submissions yet for this quiz",
          submissions: [],
        });
        continue;
      }

      const detailedSubs = submissions.map((submission) => {
        let totalScore = 0;

        const detailedAnswers = submission.answers.map((ans) => {
          const question = quiz.questions.find(
            (q) => q._id.toString() === ans.questionId.toString()
          );

          if (!question) return null;

          return {
            questionText: question.questionText,
            givenAnswer: ans.userAnswer,
            expected: quiz.type === "MCQ" ? question.correctAnswer : question.expectedOutput,
            result: ans.isCorrect ? "✅ Correct" : "❌ Incorrect",
          };
        }).filter(Boolean); // Removes nulls

        totalScore = submission.score; // Use pre-calculated score

        return {
          student: submission.userId?.username || submission.userId?.name || "Unknown",
          email: submission.userId?.email || "N/A",
          score: totalScore,
          submittedAt: submission.completedAt,
          answers: detailedAnswers,
          timeTaken: submission.timeTaken,
          percentage: Math.round((submission.score / submission.totalQuestions) * 100)
        };
      });

      results.push({
        quiz: quiz.title,
        quizId: quiz._id,
        topic: quiz.topic || "N/A",
        type: quiz.type || "N/A",
        submissions: detailedSubs,
      });
    }

    res.status(200).json(results);
  } catch (err) {
    console.error("❌ Error fetching all submissions:", err);
    res.status(500).json({ message: "Failed to fetch all quiz submissions" });
  }
};
