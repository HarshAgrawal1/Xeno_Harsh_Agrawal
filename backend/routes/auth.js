const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Endpoint to handle Google Auth data
router.post('/auth/google', async (req, res) => {
  const { googleId, name, email, avatar } = req.body;

  try {
    // Check if the user already exists
    let user = await User.findOne({ googleId });

    if (!user) {
      // Create a new user
      user = new User({
        googleId,
        name,
        email,
        avatar,
      });
      await user.save();
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});

module.exports = router;
