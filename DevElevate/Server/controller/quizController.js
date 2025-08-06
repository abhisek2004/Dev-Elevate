import Quiz from "../model/Quiz.js";

// Create a quiz with questions
export const createQuiz = async (req, res) => {
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

    res.status(201).json({
      message: "Quiz created successfully.",
      quiz,
    });
  } catch (error) {
    console.error(`[CreateQuiz Error] ${error.message}`);
    res.status(500).json({
      message: "Failed to create quiz. Please try again later.",
      error: error.message,
    });
  }
};

// Get all quizzes
export const getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find().populate("createdBy", "username email");
    res.status(200).json(quizzes);
  } catch (error) {
    console.error(`[GetAllQuizzes Error] ${error.message}`);
    res.status(500).json({
      message: "Failed to fetch quizzes. Please try again later.",
      error: error.message,
    });
  }
};

// Get quiz by ID
export const getQuizById = async (req, res) => {
  try {
    const { quizId } = req.params;

    const quiz = await Quiz.findById(quizId)
      .populate("questions")
      .populate("createdBy", "username email");

    if (!quiz) {
      return res
        .status(404)
        .json({ message: "Quiz not found. Invalid quiz ID." });
    }

    res.status(200).json(quiz);
  } catch (error) {
    console.error(`[GetQuizById Error] ${error.message}`);
    res.status(500).json({
      message: "Failed to fetch quiz. Please try again later.",
      error: error.message,
    });
  }
};

// Update quiz metadata only
export const updateQuizInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, topic, difficulty } = req.body;

    const quiz = await Quiz.findById(id);
    if (!quiz) {
      return res
        .status(404)
        .json({ message: "Quiz not found. Invalid quiz ID." });
    }

    if (title !== undefined) quiz.title = title;
    if (topic !== undefined) quiz.topic = topic;
    if (difficulty !== undefined) quiz.difficulty = difficulty;

    await quiz.save();
    res.status(200).json({
      message: "Quiz metadata updated successfully.",
      quiz,
    });
  } catch (error) {
    console.error(`[UpdateQuizInfo Error] ${error.message}`);
    res.status(500).json({
      message: "Failed to update quiz. Please try again later.",
      error: error.message,
    });
  }
};

// Delete a quiz
export const deleteQuiz = async (req, res) => {
  try {
    const { id } = req.params;

    const quiz = await Quiz.findByIdAndDelete(id);
    if (!quiz) {
      return res
        .status(404)
        .json({ message: "Quiz not found. It may have already been deleted." });
    }

    res.status(200).json({ message: "Quiz deleted successfully." });
  } catch (error) {
    console.error(`[DeleteQuiz Error] ${error.message}`);
    res.status(500).json({
      message: "Failed to delete quiz. Please try again later.",
      error: error.message,
    });
  }
};

// Add a new question to quiz
export const addQuestion = async (req, res) => {
  try {
    const { quizId } = req.params;
    const newQuestion = req.body;

    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res
        .status(404)
        .json({ message: "Quiz not found. Invalid quiz ID." });
    }

    quiz.questions.push(newQuestion);
    await quiz.save();

    res.status(200).json({
      message: "Question added to quiz successfully.",
      quiz,
    });
  } catch (error) {
    console.error(`[AddQuestion Error] ${error.message}`);
    res.status(500).json({
      message: "Failed to add question. Please try again later.",
      error: error.message,
    });
  }
};

// Update a specific question by ID
export const updateQuestion = async (req, res) => {
  try {
    const { quizId, questionId } = req.params;
    const updatedFields = req.body;

    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res
        .status(404)
        .json({ message: "Quiz not found. Invalid quiz ID." });
    }

    const question = quiz.questions.id(questionId);
    if (!question) {
      return res
        .status(404)
        .json({ message: "Question not found. Invalid question ID." });
    }

    Object.assign(question, updatedFields);
    await quiz.save();

    res.status(200).json({
      message: "Question updated successfully.",
      quiz,
    });
  } catch (error) {
    console.error(`[UpdateQuestion Error] ${error.message}`);
    res.status(500).json({
      message: "Failed to update question. Please try again later.",
      error: error.message,
    });
  }
};

// Delete a specific question
export const deleteQuestion = async (req, res) => {
  try {
    const { quizId, questionId } = req.params;

    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res
        .status(404)
        .json({ message: "Quiz not found. Invalid quiz ID." });
    }

    const question = quiz.questions.id(questionId);
    if (!question) {
      return res
        .status(404)
        .json({ message: "Question not found. Invalid question ID." });
    }

    quiz.questions.pull(questionId);
    await quiz.save();

    res.status(200).json({
      message: "Question deleted successfully from quiz.",
      quiz,
    });
  } catch (error) {
    console.error(`[DeleteQuestion Error] ${error.message}`);
    res.status(500).json({
      message: "Failed to delete question. Please try again later.",
      error: error.message,
    });
  }
};
