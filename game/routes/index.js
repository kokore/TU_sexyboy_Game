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
router.get('/question', function(req, res, next) {
    var fs = require('fs');
    var ch = req.query.c - 1;
    var name = req.query.name;
    var readfromfile = fs.readFileSync('public/question/p.' + name + '.json', 'utf8');
    var jsonformat = JSON.parse(readfromfile);
    var question = jsonformat.question[ch].namequestion;
    var ch1 = jsonformat.question[ch].choice[0];
    var ch2 = jsonformat.question[ch].choice[1];
    var ch3 = jsonformat.question[ch].choice[2];
    var ch4 = jsonformat.question[ch].choice[3];
    // if (req.query.name == 'in') {
    //     // var data1 = fs.readFileSync("question/p.in.json",
    //     //     "utf8");
    //     // console.log(data);
    //     console.log('in');
    //
    // } else if (req.query.name == 'gr') {
    //
    // } else if (req.query.name == 'ph') {
    //
    // } else {
    //     console.log('404');
    // }
    res.render('question', {
        dataq: question,
        c1: ch1,
        c2: ch2,
        c3: ch3,
        c4: ch4
    });
});
module.exports = router;
r;
