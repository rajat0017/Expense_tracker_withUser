const express = require('express');

const purchaseController = require('../controllers/purchase');

const authenticatemiddleware = require('../middlewares/auth');

const router = express.Router();

router.get('/purchase/premiummembership',authenticatemiddleware.authentication, purchaseController.purchasepremium);

router.post('/updatetransactionstatus', authenticatemiddleware.authentication, purchaseController.updatetransactionstatus)

module.exports  =router;