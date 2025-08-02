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
    res.status(201).json({ message: "Quiz created successfully", quiz });
  } catch (error) {
    console.error("Error creating quiz:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get all quizzes
export const getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find().populate("createdBy", "username email");
    res.status(200).json(quizzes);
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



// Update quiz metadata only
export const updateQuizInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, topic, difficulty} = req.body;

    const quiz = await Quiz.findById(id);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    if (title !== undefined) quiz.title = title;
    if (topic !== undefined) quiz.topic = topic;
    if (difficulty !== undefined) quiz.difficulty = difficulty;
    // if (type !== undefined) quiz.type = type;

    await quiz.save();
    res.status(200).json({ message: "Quiz metadata updated", quiz });
  } catch (error) {
    console.error("Error updating quiz:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete a quiz
export const deleteQuiz = async (req, res) => {
  try {
    const { id } = req.params;
    const quiz = await Quiz.findByIdAndDelete(id);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    res.status(200).json({ message: "Quiz deleted successfully" });
  } catch (error) {
    console.error("Error deleting quiz:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Add a new question to quiz
export const addQuestion = async (req, res) => {
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
  } catch (error) {
    console.error("Error adding question:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update a specific question by ID
export const updateQuestion = async (req, res) => {
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
  } catch (error) {
    console.error("Error updating question:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete a specific question
export const deleteQuestion = async (req, res) => {
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
  } catch (error) {
    console.error("Error deleting question:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const getQuizById = async (req, res) => {
  try {
    const { quizId } = req.params;

    if (!quizId) {
      return res.status(400).json({ success: false, message: "Quiz ID is required" });
    }

    const quiz = await Quiz.findById(quizId)
      .populate("createdBy", "username email")
      .populate("questions"); // Only if questions are in a separate collection

    if (!quiz) {
      return res.status(404).json({ success: false, message: "Quiz not found" });
    }

    res.status(200).json({ success: true, quiz });
  } catch (error) {
    console.error("Error fetching quiz:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
