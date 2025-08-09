import Question from '../model/Question.js';
import Answer from '../model/Answer.js';

// Controller for User Operations

export const postQuestion = async (req, res) => {
    try {
        const { title, description, tags } = req.body;
        if (!title || !description) {
            return res.status(400).json({ message: 'Title and description are required' });
        }

        const question = new Question({
            title, description, tags,
            user: req.user._id
        });
        await question.save();

        res.status(201).json({ id: question._id, ...question._doc });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const getQuestions = async (req, res) => {
    try {
        const questions = await Question.find().populate('user', 'name');
        res.status(200).json(questions.map(question => ({ id: question._id, ...question._doc })));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const postAnswer = async (req, res) => {
    try {
        const { id } = req.params;
        const { content } = req.body;

        if (!id || !content) {
            return res.status(400).json({ message: 'Question ID and content are required' });
        }

        const answer = new Answer({
            content,
            questionId: id,
            user: req.user._id
        });
        await answer.save();

        // Update the question with the new answer
        await Question.findByIdAndUpdate(id, { $push: { answers: answer._id } });

        res.status(201).json({ id: answer._id, ...answer._doc });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const getAnswers = async (req, res) => {
    try {
        const { id } = req.params;
        const questionExists = await Question.exists({ _id: id });
        if (!questionExists) {
            return res.status(404).json({ message: 'Question not found' });
        }

        const answers = await Answer.find({ questionId: id }).populate('user', 'name');
        res.status(200).json(answers.map(answer => ({ id: answer._id, ...answer._doc })));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


// Controller for Admin Operations

export const deleteQuestion = async (req, res) => {
    try {
        const { id } = req.params;

        const question = await Question.findByIdAndDelete(id);
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }

        res.status(200).json({ message: 'Question deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const markAsResolved = async (req, res) => {
    try {
        const { id } = req.params;

        const question = await Question.findByIdAndUpdate(id, { isResolved: true }, { new: true });
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }

        res.status(200).json({ message: 'Question marked as resolved' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const acceptAnswer = async (req, res) => {
    try {
        const { answerId } = req.params;
        if (!answerId) {
            return res.status(400).json({ message: 'Answer ID are required' });
        }

        const answer = await Answer.findByIdAndUpdate(answerId, { accepted: true }, { new: true });
        if (!answer) {
            return res.status(404).json({ message: 'Answer not found' });
        }

        res.status(200).json({ message: 'Answer accepted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// questions = [
//     {
//         id: '1',
//         title: 'How do I center a div in CSS?',
//         description: 'I am trying to center a div both vertically and horizontally. What is the best way to do this in modern CSS?',
//         tags: ['css', 'html', 'frontend'],
//         user: 'user1',
//         answers: [],
//         resolved: false
//     },
//     {
//         id: '2',
//         title: 'What is the difference between let, const, and var in JavaScript?',
//         description: 'Can someone explain the differences between let, const, and var declarations in JavaScript with examples?',
//         tags: ['javascript', 'es6'],
//         user: 'user2',
//         answers: [],
//         resolved: false
//     },
//     {
//         id: '3',
//         title: 'How to connect MongoDB with Node.js?',
//         description: 'I want to connect my Node.js application to a MongoDB database. What packages and code should I use?',
//         tags: ['nodejs', 'mongodb', 'database'],
//         user: 'user3',
//         answers: [],
//         resolved: false
//     }
// ]