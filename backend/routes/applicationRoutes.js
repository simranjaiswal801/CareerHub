const express = require('express');
const {
  createApplication,
  getApplications,
  getApplicationById,
  updateApplication,
  deleteApplication,
  getStats,
} = require('../controllers/applicationController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);

router.get('/stats/summary', getStats);

router.route('/').post(createApplication).get(getApplications);
router.route('/:id').get(getApplicationById).put(updateApplication).delete(deleteApplication);

module.exports = router;
