const express = require('express');
const { createSkill, getSkills, updateSkill, deleteSkill } = require('../controllers/skillController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);

router.route('/').post(createSkill).get(getSkills);
router.route('/:id').put(updateSkill).delete(deleteSkill);

module.exports = router;
