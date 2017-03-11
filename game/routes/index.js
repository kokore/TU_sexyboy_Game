var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index2');
});

router.get('/selectBoy', function(req, res, next) {
    res.render('selectBoy');
});

router.get('/bio', function(req, res, next) {
    res.render('bio');
    if (req.query.name == 'in') {

    } else if (req.query.name == 'gr') {

    } else if (req.query.name == 'ph') {

    } else {
        console.log('404');
    }
});

module.exports = router;
