const express = require('express');

const path = require('path');

const router = express.Router();

const forgotPassController = require('../controllers/forgotPassword');

router.post('/password/forgotpassword', forgotPassController.requests,forgotPassController.forgotPassword)

router.get('/password/updatepassword/:resetpasswordid', forgotPassController.updatepassword)

router.get('/password/resetpassword/:id',forgotPassController.resetpassword)

module.exports= router;