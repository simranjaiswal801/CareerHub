const Skill = require('../models/Skill');

const createSkill = async (req, res, next) => {
  try {
    const { skillName } = req.body;
    if (!skillName) {
      res.status(400);
      throw new Error('Skill name is required');
    }
    const skill = await Skill.create({ ...req.body, user: req.user._id });
    res.status(201).json(skill);
  } catch (error) {
    next(error);
  }
};

const getSkills = async (req, res, next) => {
  try {
    const skills = await Skill.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(skills);
  } catch (error) {
    next(error);
  }
};

const updateSkill = async (req, res, next) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) {
      res.status(404);
      throw new Error('Skill not found');
    }
    if (skill.user.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error('Not authorized');
    }
    const updated = await Skill.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
};

const deleteSkill = async (req, res, next) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) {
      res.status(404);
      throw new Error('Skill not found');
    }
    if (skill.user.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error('Not authorized');
    }
    await skill.deleteOne();
    res.status(200).json({ message: 'Skill deleted', id: req.params.id });
  } catch (error) {
    next(error);
  }
};

module.exports = { createSkill, getSkills, updateSkill, deleteSkill };
