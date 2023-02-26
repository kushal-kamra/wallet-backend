const express = require('express');
const router = express.Router();
const transactionsController = require('../controllers/transactions');

/* GET transactions listing. */
router.get('/', transactionsController.getTransactions);

module.exports = router;