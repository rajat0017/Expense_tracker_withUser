const express = require('express');

const path = require('path');

const router = express.Router();

const userController = require('../controllers/user');

router.post('/user', userController.adduser);

router.post('/login', userController.login);

module.exports= router;