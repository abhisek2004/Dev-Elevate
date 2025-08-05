import { Request, Response } from "express";
import mongoose, { Types } from "mongoose";
import { IQuestion, IQuiz, Quiz } from "../models/quiz.model";
import { ISubmission, Submission } from "../models/submission.model";
import { IUser } from "../models/user.model";

export const getAllSubmissionsDetailed = async (req: Request, res: Response) => {
    try {
        const quizzes: IQuiz[] = await Quiz.find();

        if (!quizzes || quizzes.length === 0) {
            return res.status(200).json({ message: "No quizzes found", submissions: [] });
        }

        const results = [];

        for (const quiz of quizzes) {
            if (!quiz._id || !Array.isArray(quiz.questions)) continue;

            // Populate userId with only name and email fields
            const submissions: ISubmission[] = await Submission.find({ quizId: quiz._id }).populate("userId", "name email");

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
                        // Find question by _id, converting both IDs to string for comparison
                        const question = quiz.questions.find(
                            (q: IQuestion & { _id: Types.ObjectId }) => q._id.toString() === ans.questionId.toString()
                        );

                        if (!question) return null;

                        let isCorrect = false;

                        if (quiz.type === "MCQ") {
                            isCorrect = question.correctAnswer === ans.givenAnswer;
                        } else if (quiz.type === "Code") {
                            isCorrect = question.expectedOutput?.trim() === ans.output?.trim();
                        }

                        if (isCorrect) totalScore += 1;

                        return {
                            questionText: question.questionText,
                            givenAnswer: ans.givenAnswer,
                            expected: quiz.type === "MCQ" ? question.correctAnswer : question.expectedOutput,
                            result: isCorrect ? "✅ Correct" : "❌ Incorrect",
                        };
                    })
                    .filter(Boolean); // remove nulls

                return {
                    student: (submission.userId as IUser)?.name || "Unknown",
                    email: (submission.userId as IUser)?.email || "N/A",
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
        console.error("❌ Error fetching all submissions:", err);
        res.status(500).json({ message: "Failed to fetch all quiz submissions" });
    }
};
