const express = require('express');
const router = express.Router();
const setupController = require('../controllers/setup');

/* GET setup */
router.get('/', function(req, res, next) {
  res.send('respond with a resource from setup get route');
});

/* POST setup */
router.post('/', setupController.walletSetup);

module.exports = router;
