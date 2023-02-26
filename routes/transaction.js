const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transaction');

/* GET transact listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource from transact get route');
});

/* POST transact listing. */
router.post('/:walletId', transactionController.createTransaction);

module.exports = router;