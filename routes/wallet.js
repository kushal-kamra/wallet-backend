const express = require('express');
const router = express.Router();
const walletController = require('../controllers/wallet');

/* GET wallet */
router.get('/:id', walletController.getWallet);

module.exports = router;