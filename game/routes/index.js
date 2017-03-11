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
    if (req.query.name == 'in') {
        var fs = require("fs");
        var obj = JSON.parse(fs.readFileSync('/public/bio/bioin.json','utf8'));
        res.render('bio',{bio:""+obj.bio});
    } else if (req.query.name == 'gr') {
        res.render('bio',{biogr:"bio"});
    } else if (req.query.name == 'ph') {   
        res.render('bio',{bioph:"bio"});
    } else {
        console.log('404');
    }
});

module.exports = router;
