const express = require('express');

const premiumFeatureController = require('../controllers/premiumFeatures');

const authenticatemiddleware = require('../middlewares/auth');

const router = express.Router();

router.get('/premium/showLeaderboard', authenticatemiddleware.authentication, premiumFeatureController.getUserLeaderboard)

module.exports = router;