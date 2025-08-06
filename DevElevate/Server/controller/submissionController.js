import mongoose from "mongoose";
import Submission from "../model/Submission.js";
import Quiz from "../model/Quiz.js";

export const getAllSubmissionsDetailed = async (req, res) => {
  try {
    const quizzes = await Quiz.find();

    if (!quizzes || quizzes.length === 0) {
      return res
        .status(200)
        .json({ message: "No quizzes found in the database", submissions: [] });
    }

    const results = [];

    for (const quiz of quizzes) {
      if (!quiz._id || !Array.isArray(quiz.questions)) continue;

      const submissions = await Submission.find({ quizId: quiz._id }).populate(
        "userId",
        "name email"
      );

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

        const detailedAnswers = submission.answers
          .map((ans) => {
            const question = quiz.questions.find(
              (q) => q._id.toString() === ans.questionId.toString()
            );

            if (!question) return null;

            let isCorrect = false;

            if (quiz.type === "MCQ") {
              isCorrect = question.correctAnswer === ans.givenAnswer;
            } else if (quiz.type === "Code") {
              isCorrect =
                question.expectedOutput?.trim() === ans.output?.trim();
            }

            if (isCorrect) totalScore += 1;

            return {
              questionText: question.questionText,
              givenAnswer: ans.givenAnswer,
              expected:
                quiz.type === "MCQ"
                  ? question.correctAnswer
                  : question.expectedOutput,
              result: isCorrect ? "✅ Correct" : "❌ Incorrect",
            };
          })
          .filter(Boolean); // Remove nulls caused by missing questions

        return {
          student: submission.userId?.name || "Unknown",
          email: submission.userId?.email || "N/A",
          score: totalScore,
          submittedAt: submission.submittedAt,
          answers: detailedAnswers,
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
    console.error("❌ Failed to fetch detailed quiz submissions:", err.message);
    res
      .status(500)
      .json({
        message: "An error occurred while retrieving quiz submissions",
        error: err.message,
      });
  }
};
