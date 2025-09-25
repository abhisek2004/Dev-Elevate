import Question from "../model/Question.js";
import Answer from "../model/Answer.js";

/**
 * ===========================
 *   User Operations
 * ===========================
 */

// Post a new question
export const postQuestion = async (req, res) => {
  try {
    const { title, description, tags } = req.body;
    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Title and description are required" });
    }

    const question = await new Question({
      title,
      description,
      tags,
      user: req.user._id,
    }).save();

    return res.status(201).json({ id: question._id, ...question._doc });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Get all questions
export const getQuestions = async (_req, res) => {
  try {
    const questions = await Question.find().populate("user", "name");
    return res
      .status(200)
      .json(questions.map((q) => ({ id: q._id, ...q._doc })));
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Post an answer to a question
export const postAnswer = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    if (!id || !content) {
      return res
        .status(400)
        .json({ message: "Question ID and content are required" });
    }

    const answer = await new Answer({
      content,
      questionId: id,
      user: req.user._id,
    }).save();

    await Question.findByIdAndUpdate(id, { $push: { answers: answer._id } });

    return res.status(201).json({ id: answer._id, ...answer._doc });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Get all answers for a specific question
export const getAnswers = async (req, res) => {
  try {
    const { id } = req.params;
    const questionExists = await Question.exists({ _id: id });

    if (!questionExists) {
      return res.status(404).json({ message: "Question not found" });
    }

    const answers = await Answer.find({ questionId: id }).populate(
      "user",
      "name"
    );
    return res.status(200).json(answers.map((a) => ({ id: a._id, ...a._doc })));
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/**
 * ===========================
 *   Admin Operations
 * ===========================
 */

// Delete a question
export const deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const question = await Question.findByIdAndDelete(id);

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    return res.status(200).json({ message: "Question deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Mark a question as resolved
export const markAsResolved = async (req, res) => {
  try {
    const { id } = req.params;
    const question = await Question.findByIdAndUpdate(
      id,
      { isResolved: true },
      { new: true }
    );

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    return res.status(200).json({ message: "Question marked as resolved" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Accept an answer
export const acceptAnswer = async (req, res) => {
  try {
    const { answerId } = req.params;
    if (!answerId) {
      return res.status(400).json({ message: "Answer ID is required" });
    }

    const answer = await Answer.findByIdAndUpdate(
      answerId,
      { accepted: true },
      { new: true }
    );

    if (!answer) {
      return res.status(404).json({ message: "Answer not found" });
    }

    return res.status(200).json({ message: "Answer accepted" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
