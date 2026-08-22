const Interview = require('../models/Interview');

const createInterview = async (req, res, next) => {
  try {
    const { companyName, jobTitle, date } = req.body;
    if (!companyName || !jobTitle || !date) {
      res.status(400);
      throw new Error('Company name, job title and date are required');
    }

    const interview = await Interview.create({ ...req.body, user: req.user._id });
    res.status(201).json(interview);
  } catch (error) {
    next(error);
  }
};

const getInterviews = async (req, res, next) => {
  try {
    const interviews = await Interview.find({ user: req.user._id }).sort({ date: 1 });
    res.status(200).json(interviews);
  } catch (error) {
    next(error);
  }
};

const getInterviewById = async (req, res, next) => {
  try {
    const interview = await Interview.findById(req.params.id);
    if (!interview) {
      res.status(404);
      throw new Error('Interview not found');
    }
    if (interview.user.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error('Not authorized');
    }
    res.status(200).json(interview);
  } catch (error) {
    next(error);
  }
};

const updateInterview = async (req, res, next) => {
  try {
    const interview = await Interview.findById(req.params.id);
    if (!interview) {
      res.status(404);
      throw new Error('Interview not found');
    }
    if (interview.user.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error('Not authorized');
    }
    const updated = await Interview.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
};

const deleteInterview = async (req, res, next) => {
  try {
    const interview = await Interview.findById(req.params.id);
    if (!interview) {
      res.status(404);
      throw new Error('Interview not found');
    }
    if (interview.user.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error('Not authorized');
    }
    await interview.deleteOne();
    res.status(200).json({ message: 'Interview deleted', id: req.params.id });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createInterview,
  getInterviews,
  getInterviewById,
  updateInterview,
  deleteInterview,
};
