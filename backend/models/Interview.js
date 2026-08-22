const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    companyName: { type: String, required: true, trim: true },
    jobTitle: { type: String, required: true, trim: true },
    interviewType: {
      type: String,
      enum: ['HR', 'Technical', 'Managerial', 'Group Discussion', 'Other'],
      default: 'Technical',
    },
    date: { type: Date, required: true },
    time: { type: String, default: '' },
    location: { type: String, default: '' },
    meetingLink: { type: String, default: '' },
    notes: { type: String, default: '' },
    status: {
      type: String,
      enum: ['Scheduled', 'Completed', 'Cancelled'],
      default: 'Scheduled',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Interview', interviewSchema);
