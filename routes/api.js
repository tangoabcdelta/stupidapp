var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("api version 1");
});

router.get('/events', function(req, res, next) {
  res.send("all events");
});

router.get('/games', function(req, res, next) {
  res.send("all games");
});

module.exports = router;
