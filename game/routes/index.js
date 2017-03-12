var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
});

router.get('/selectBoy', function(req, res, next) {
    res.render('selectBoy');
});

router.get('/bio', function(req, res, next) {
    var fs = require("fs");
    if (req.query.name == 'in') {
        var obj = JSON.parse(fs.readFileSync("public/bio/bioin.json", "utf8"));
        var bioin = obj.bio;
        res.render('bio', {
            name: 'อิน',
            bio: bioin,
            nickname: 'in'
        });

    } else if (req.query.name == 'gr') {
        var obj1 = JSON.parse(fs.readFileSync("public/bio/biogr.json", "utf8"));
        var biogr = obj1.bio;
        res.render('bio', {
            name: 'กราฟ',
            bio: biogr,
            nickname: 'gr'
        });
    } else if (req.query.name == 'ph') {
        var obj2 = JSON.parse(fs.readFileSync("public/bio/bioph.json", "utf8"));
        var bioph = obj2.bio;
        res.render('bio', {
            name: 'ริว',
            bio: bioph,
            nickname: 'ph'
        });
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
    var ch2 = jsonformat.question[ch].choice[1];
    var ch3 = jsonformat.question[ch].choice[2];
    var ch4 = jsonformat.question[ch].choice[3];
    res.render('question', {
        name: name,
        ch: ch % 3 + 1,
        im: ch + 1,
        dataq: question,
        c1: ch1,
        c2: ch2,
        c3: ch3,
        c4: ch4
    });
});
router.get('/result', function(req, res, next) {
    var name = req.query.name;
    var fs = require('fs');
    var readfromfile = fs.readFileSync('public/question/p.' + name + '.json', 'utf8');
    var jsonformat = JSON.parse(readfromfile);
    var score = 0;
    console.log(jsonformat.question[0].answerquestion + req.query.c1);
    console.log(jsonformat.question[1].answerquestion + req.query.c2);
    console.log(jsonformat.question[2].answerquestion + req.query.c3);
    console.log(jsonformat.question[3].answerquestion + req.query.c4);
    console.log(jsonformat.question[4].answerquestion + req.query.c5);
    if (jsonformat.question[0].answerquestion == req.query.c1) {
        score++;
    }
    if (jsonformat.question[1].answerquestion == req.query.c2) {
        score++;
    }
    if (jsonformat.question[2].answerquestion == req.query.c3) {
        score++;
    }
    if (jsonformat.question[3].answerquestion == req.query.c4) {
        score++;
    }
    if (jsonformat.question[4].answerquestion == req.query.c5) {
        score++;
    }
    var result;
    if (score >= 3) {
        result = "WIN";
    } else {
        result = "LOST";
    }
    res.render('result', {
        name: name,
        score: score,
        result: result
    });
});
module.exports = router;
