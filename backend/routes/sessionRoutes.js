const express = require('express');
const { check, validationResult } = require('express-validator');
const Session = require('../models/Session');
const auth = require('../middleware/auth');

const router = express.Router();

// Create a new session
router.post('/', [
  auth,
  check('skill', 'Skill is required').not().isEmpty(),
  check('date', 'Date is required').isISO8601()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { skill, date } = req.body;

  try {
    const newSession = new Session({
      provider: req.user.id,
      skill,
      date
    });

    const session = await newSession.save();
    res.json(session);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;

