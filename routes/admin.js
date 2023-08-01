const express = require('express');

const path = require('path');

const router = express.Router();

const controller = require('../controllers/admin');

router.post('/user', controller.adduser);

router.post('/login', controller.login);

router.post('/addexpense', controller.addExpense);

router.get('/getExpense', controller.getExpenses)

router.delete('/deleteExpense/:id', controller.deleteExpense);

module.exports= router;