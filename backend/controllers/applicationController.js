const Application = require('../models/Application');

// @desc    Create new application
// @route   POST /api/applications
// @access  Private
const createApplication = async (req, res, next) => {
  try {
    const { companyName, jobTitle } = req.body;

    if (!companyName || !jobTitle) {
      res.status(400);
      throw new Error('Company name and job title are required');
    }

    const application = await Application.create({
      ...req.body,
      user: req.user._id,
    });

    res.status(201).json(application);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all applications for logged-in user (supports search/filter/sort)
// @route   GET /api/applications
// @access  Private
const getApplications = async (req, res, next) => {
  try {
    const { search, status, jobType, sort } = req.query;

    const query = { user: req.user._id };

    if (status) query.status = status;
    if (jobType) query.jobType = jobType;

    if (search) {
      query.$or = [
        { companyName: { $regex: search, $options: 'i' } },
        { jobTitle: { $regex: search, $options: 'i' } },
      ];
    }

    let sortOption = { createdAt: -1 }; // newest first by default
    if (sort === 'oldest') sortOption = { createdAt: 1 };

    const applications = await Application.find(query).sort(sortOption);

    res.status(200).json(applications);
  } catch (error) {
    next(error);
  }
};

// @desc    Get single application
// @route   GET /api/applications/:id
// @access  Private
const getApplicationById = async (req, res, next) => {
  try {
    const application = await Application.findById(req.params.id);

    if (!application) {
      res.status(404);
      throw new Error('Application not found');
    }

    if (application.user.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error('Not authorized to access this application');
    }

    res.status(200).json(application);
  } catch (error) {
    next(error);
  }
};

// @desc    Update application
// @route   PUT /api/applications/:id
// @access  Private
const updateApplication = async (req, res, next) => {
  try {
    const application = await Application.findById(req.params.id);

    if (!application) {
      res.status(404);
      throw new Error('Application not found');
    }

    if (application.user.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error('Not authorized to update this application');
    }

    const updated = await Application.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete application
// @route   DELETE /api/applications/:id
// @access  Private
const deleteApplication = async (req, res, next) => {
  try {
    const application = await Application.findById(req.params.id);

    if (!application) {
      res.status(404);
      throw new Error('Application not found');
    }

    if (application.user.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error('Not authorized to delete this application');
    }

    await application.deleteOne();

    res.status(200).json({ message: 'Application deleted', id: req.params.id });
  } catch (error) {
    next(error);
  }
};

// @desc    Get dashboard statistics
// @route   GET /api/applications/stats/summary
// @access  Private
const getStats = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const [total, applied, interview, offer, rejected] = await Promise.all([
      Application.countDocuments({ user: userId }),
      Application.countDocuments({ user: userId, status: 'Applied' }),
      Application.countDocuments({ user: userId, status: 'Interview' }),
      Application.countDocuments({ user: userId, status: 'Offer' }),
      Application.countDocuments({ user: userId, status: 'Rejected' }),
    ]);

    res.status(200).json({ total, applied, interview, offer, rejected });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createApplication,
  getApplications,
  getApplicationById,
  updateApplication,
  deleteApplication,
  getStats,
};
