const express = require('express');

const path = require('path');

const router = express.Router();

const controller = require('../controllers/admin');

router.post('/user', controller.adduser);

router.post('/login', controller.login);

module.exports= router;