import Question from "../model/Question.js";
import Answer from "../model/Answer.js";

// Controller for User Operations

export const postQuestion = async (req, res) => {
  try {
    const { title, description, tags } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        message:
          "Both 'title' and 'description' fields are required to post a question.",
      });
    }

    const question = new Question({
      title,
      description,
      tags,
      user: req.user._id,
    });

    await question.save();

    res.status(201).json({ id: question._id, ...question._doc });
  } catch (error) {
    console.error(`[PostQuestion Error] ${error.message}`);
    res.status(400).json({
      message:
        "Failed to post the question. Please check your input and try again.",
      error: error.message,
    });
  }
};

export const getQuestions = async (req, res) => {
  try {
    const questions = await Question.find().populate("user", "name");
    res.status(200).json(
      questions.map((question) => ({
        id: question._id,
        ...question._doc,
      }))
    );
  } catch (error) {
    console.error(`[GetQuestions Error] ${error.message}`);
    res.status(500).json({
      message: "Failed to retrieve questions. Please try again later.",
      error: error.message,
    });
  }
};

export const postAnswer = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    if (!id || !content) {
      return res.status(400).json({
        message:
          "Both 'question ID' and 'content' are required to post an answer.",
      });
    }

    const answer = new Answer({
      content,
      questionId: id,
      user: req.user._id,
    });

    await answer.save();

    await Question.findByIdAndUpdate(id, {
      $push: { answers: answer._id },
    });

    res.status(201).json({ id: answer._id, ...answer._doc });
  } catch (error) {
    console.error(`[PostAnswer Error] ${error.message}`);
    res.status(400).json({
      message:
        "Failed to post the answer. Please ensure the question ID is valid.",
      error: error.message,
    });
  }
};

export const getAnswers = async (req, res) => {
  try {
    const { id } = req.params;

    const questionExists = await Question.exists({ _id: id });
    if (!questionExists) {
      return res.status(404).json({
        message: "Question not found. Please check the question ID.",
      });
    }

    const answers = await Answer.find({ questionId: id }).populate(
      "user",
      "name"
    );
    res.status(200).json(
      answers.map((answer) => ({
        id: answer._id,
        ...answer._doc,
      }))
    );
  } catch (error) {
    console.error(`[GetAnswers Error] ${error.message}`);
    res.status(500).json({
      message:
        "Failed to fetch answers for the question. Please try again later.",
      error: error.message,
    });
  }
};

// Controller for Admin Operations

export const deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;

    const question = await Question.findByIdAndDelete(id);
    if (!question) {
      return res.status(404).json({
        message: "Question not found. It may have already been deleted.",
      });
    }

    res.status(200).json({ message: "Question deleted successfully." });
  } catch (error) {
    console.error(`[DeleteQuestion Error] ${error.message}`);
    res.status(500).json({
      message: "Failed to delete the question. Please try again.",
      error: error.message,
    });
  }
};

export const markAsResolved = async (req, res) => {
  try {
    const { id } = req.params;

    const question = await Question.findByIdAndUpdate(
      id,
      { isResolved: true },
      { new: true }
    );
    if (!question) {
      return res.status(404).json({
        message: "Question not found. Unable to mark as resolved.",
      });
    }

    res.status(200).json({ message: "Question marked as resolved." });
  } catch (error) {
    console.error(`[MarkAsResolved Error] ${error.message}`);
    res.status(500).json({
      message: "Failed to update question status. Please try again.",
      error: error.message,
    });
  }
};

export const acceptAnswer = async (req, res) => {
  try {
    const { answerId } = req.params;

    if (!answerId) {
      return res.status(400).json({
        message: "Answer ID is required to accept an answer.",
      });
    }

    const answer = await Answer.findByIdAndUpdate(
      answerId,
      { accepted: true },
      { new: true }
    );
    if (!answer) {
      return res.status(404).json({
        message: "Answer not found. Please verify the answer ID.",
      });
    }

    res.status(200).json({ message: "Answer has been marked as accepted." });
  } catch (error) {
    console.error(`[AcceptAnswer Error] ${error.message}`);
    res.status(500).json({
      message: "Failed to accept the answer. Please try again.",
      error: error.message,
    });
  }
};
