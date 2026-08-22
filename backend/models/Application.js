const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    companyName: { type: String, required: [true, 'Company name is required'], trim: true },
    jobTitle: { type: String, required: [true, 'Job title is required'], trim: true },
    location: { type: String, default: '' },
    jobType: {
      type: String,
      enum: ['Full Time', 'Part Time', 'Internship', 'Contract'],
      default: 'Full Time',
    },
    jobUrl: { type: String, default: '' },
    salary: { type: String, default: '' },
    status: {
      type: String,
      enum: ['Wishlist', 'Applied', 'Screening', 'Interview', 'Offer', 'Rejected', 'Withdrawn'],
      default: 'Wishlist',
    },
    appliedDate: { type: Date },
    deadline: { type: Date },
    notes: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Application', applicationSchema);
