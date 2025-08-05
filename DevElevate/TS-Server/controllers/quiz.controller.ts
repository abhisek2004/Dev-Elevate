import { Request, Response, NextFunction } from "express";
import {Quiz} from "../models/quiz.model";


export const createQuiz = async (req: Request<{}, {}, QuizBody>, res: Response, next: NextFunction) => {
  try {
    const { title, topic, difficulty, type, questions, createdBy } = req.body;

    const quiz = new Quiz({
      title,
      topic,
      difficulty,
      type,
      questions,
      createdBy,
    });

    await quiz.save();
    res.status(201).json({ message: "Quiz created successfully", quiz });
  } catch (error: any) {
    console.error("Error creating quiz:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllQuizzes = async (req: Request, res: Response) => {
  try {
    const quizzes = await Quiz.find().populate("createdBy", "username email");
    res.status(200).json(quizzes);
  } catch (error: any) {
    console.error("Error fetching quizzes:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getQuizById = async (req: Request<{ quizId: string }>, res: Response) => {
  try {
    const { quizId } = req.params;
    const quiz = await Quiz.findById(quizId)
      .populate("questions")
      .populate("createdBy", "username email");

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    res.status(200).json(quiz);
  } catch (error: any) {
    console.error("Error fetching quiz by ID:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



export const updateQuizInfo = async (req: Request<{ id: string }, {}, UpdateQuizBody>, res: Response) => {
  try {
    const { id } = req.params;
    const { title, topic, difficulty } = req.body;

    const quiz = await Quiz.findById(id);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    if (title !== undefined) quiz.title = title;
    if (topic !== undefined) quiz.topic = topic;

    const allowedDifficulties = ["Easy", "Medium", "Hard"] as const;
    if (difficulty !== undefined) {
      if (allowedDifficulties.includes(difficulty as typeof allowedDifficulties[number])) {
        quiz.difficulty = difficulty as "Easy" | "Medium" | "Hard";
      } else {
        return res.status(400).json({ message: `Invalid difficulty value: ${difficulty}` });
      }
    }

    await quiz.save();
    res.status(200).json({ message: "Quiz metadata updated", quiz });
  } catch (error: any) {
    console.error("Error updating quiz:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteQuiz = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;
    const quiz = await Quiz.findByIdAndDelete(id);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    res.status(200).json({ message: "Quiz deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting quiz:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const addQuestion = async (req: Request<{ quizId: string }, {}, Question>, res: Response) => {
  try {
    const { quizId } = req.params;
    const newQuestion = req.body;

    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    quiz.questions.push(newQuestion);
    await quiz.save();

    res.status(200).json({ message: "Question added", quiz });
  } catch (error: any) {
    console.error("Error adding question:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateQuestion = async (
  req: Request<{ quizId: string; questionId: string }, {}, Partial<Question>>,
  res: Response
) => {
  try {
    const { quizId, questionId } = req.params;
    const updatedFields = req.body;

    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    const question = quiz.questions.id(questionId);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    Object.assign(question, updatedFields);
    await quiz.save();

    res.status(200).json({ message: "Question updated", quiz });
  } catch (error: any) {
    console.error("Error updating question:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteQuestion = async (req: Request<{ quizId: string; questionId: string }>, res: Response) => {
  try {
    const { quizId, questionId } = req.params;

    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    const question = quiz.questions.id(questionId);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    quiz.questions.pull(questionId);
    await quiz.save();

    res.status(200).json({ message: "Question deleted", quiz });
  } catch (error: any) {
    console.error("Error deleting question:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
