const express = require('express');
const router = express.Router();

/* GET transact listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource from transact get route');
});

/* POST transact listing. */
router.post('/',  function(req, res, next) {
    res.send('respond with a resource from transact post route');
});

module.exports = router;