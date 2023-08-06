const express = require('express');

const path = require('path');

const router = express.Router();

const forgotController = require('../controllers/forgotPassword');

router.post('/called/password/forgotpassword',forgotController.forgotPassword)

module.exports= router;