const express = require('express');

const path = require('path');

const router = express.Router();

const expenseController = require('../controllers/expense');

const userauthentication = require('../middlewares/auth');

router.post('/addexpense',userauthentication.authentication, expenseController.addExpense);

router.get('/getExpenses', userauthentication.authentication, expenseController.getExpenses);

router.delete('/deleteExpense/:id',userauthentication.authentication, expenseController.deleteExpense);

router.get('/user/download',userauthentication.authentication, expenseController.downloadExpense)

router.get('/user/get-downloads',userauthentication.authentication,expenseController.getDownloads)

module.exports= router;

