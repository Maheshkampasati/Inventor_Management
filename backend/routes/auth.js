const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Simple login (no hashing for brevity; use bcrypt in production)
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  if (!user) return res.status(401).json({ msg: 'Invalid credentials' });
  res.json({ username: user.username, role: user.role });
});

module.exports = router;
