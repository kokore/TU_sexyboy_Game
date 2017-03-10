var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index2');
});

router.get('/game', function(req, res, next) {
    res.render('game');
});

router.get('/bio', function(req, res, next) {
    res.render('bio');
});

module.exports = router;
