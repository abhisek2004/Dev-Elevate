import mongoose from 'mongoose';

const visitingWebsiteSchema = new mongoose.Schema({
  dateOfVisiting: {
    type: Date,
    required: true,
    default: Date.now
  },
  visit: {
    type: Boolean,
    default: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  
    required: true
  }
});

export default mongoose.model('VisitingWebsite', visitingWebsiteSchema);
