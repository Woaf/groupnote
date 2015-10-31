var express = require('express');
var router = express.Router();

var decoratePosts = require('../viewmodels/postStatus');

// Post-ok oldala
router.get('/list', function(req, res){
    req.app.models.post.find().then(function (posts){
        res.render('posts/list', {
            posts: decoratePosts(posts),
            message: req.flash('info')
        });
    });
});

// Post felvitele
router.get('/new', function(req, res){
    var validationErrors = (req.flash('validationErrors') || [{}]).pop();
    var data = (req.flash('data') || [{}]).pop();
    
    res.render('posts/new', {
        validationErrors: validationErrors, 
        data: data,
    });
});

// Post felivitele POST
router.post('/new', function(req, res){
    req.checkBody('helyszin', 'Kitöltetlen').notEmpty().withMessage('Kötelező megadni a helyszínt!');
    req.checkBody('status', 'Kitöltetlen').notEmpty().withMessage('Ezt a mezőt kötelező kitölteni');
    req.sanitizeBody('leiras').escape();
    req.checkBody('leiras', 'Kitöltetlen').notEmpty().withMessage('Ezt a mezőt kötelező kitölteni');
    
    var validationErrors = req.validationErrors(true);
    console.log(validationErrors);
    
    if(validationErrors){
        req.flash('validationErrors', validationErrors);
        req.flash('data', req.body);
        res.redirect('/posts/new');
    }
    else {
        req.app.models.post.create({
            status: req.body.status, 
            location: req.body.helyszin,
            description: req.body.leiras,
            user: req.user.id,
        })
        .then(function(error) {
            //siker esetén
            req.flash('info', 'Bejegyzés rögzítve c:');
            res.redirect('/posts/list');
        })
        .catch(function (error){
            //hiba esetén
            console.log(error);
        });
    }
});

module.exports = router;