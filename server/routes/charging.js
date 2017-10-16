var express = require('express');
var router = express.Router();
var apiKey = require ('./apiKey');

router.get('/', function(req, res, next) {
  console.log(apiKey.nobilApiKey);
});

module.exports = router;
