import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  message: {
    type: String,
    required: true  
  },
  status: {
    type: String,
    enum: ['Pending', 'Reviewed'],
    default: 'Pending'
  },
  submittedAt: {
    type: Date,
    default: Date.now
  }
});

const feedback = mongoose.model('Feedback', feedbackSchema); 
export default feedback


