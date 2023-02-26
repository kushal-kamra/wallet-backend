const express = require('express');
const router = express.Router();
const transactionsController = require('../controllers/transactions');

/* GET transactions */
router.get('/', transactionsController.getTransactions);

module.exports = router;