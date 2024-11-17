const express = require('express');
const { getCampaignHistory, createCampaign } = require('../controllers/campaignController');
const router = express.Router();

const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};


router.get('/history', ensureAuthenticated, getCampaignHistory);

// Create a new campaign
router.post('/create', ensureAuthenticated, createCampaign);

module.exports = router;
