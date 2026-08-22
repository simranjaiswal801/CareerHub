const express = require('express');
const {
  createInterview,
  getInterviews,
  getInterviewById,
  updateInterview,
  deleteInterview,
} = require('../controllers/interviewController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);

router.route('/').post(createInterview).get(getInterviews);
router.route('/:id').get(getInterviewById).put(updateInterview).delete(deleteInterview);

module.exports = router;
