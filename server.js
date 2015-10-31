var express =           require('express');

var expressValidator =  require('express-validator');
var bodyParser =        require('body-parser');
var session =           require('express-session');
var flash =             require('connect-flash');

//Importált modulok
var Waterline =         require('waterline');
var waterlineConfig =   require('./config/waterline');

var indexController =   require('./controllers/index');
var postController =    require('./controllers/post');
var loginController =   require('./controllers/login');

//-----------------

var hbs =               require('hbs');

var blocks = {};

hbs.registerHelper('extend', function(name, context){
    var block = blocks[name];
    if (!block){
        block = blocks[name] = [];
    }
    block.push(context.fn(this));
});

hbs.registerHelper('block', function(name){
    var value = (blocks[name] || []).join('\n');
    //clear the block
    blocks[name] = [];
    return value;
});


//---------------------

var passport =          require('passport');
var LocalStrategy =     require('passport-local');

passport.serializeUser(function(user, done){
    done(null, user);
});

passport.deserializeUser(function(obj, done){
    done(null, obj);
});

passport.use('local-signup', new LocalStrategy({
    usernameField: 'username', 
    passwordField: 'password', 
    passReqToCallback: true,
    },
    function(req, username, password, done){
        req.app.models.user.findOne({username: username}, function(err, user){
            if(err) {return done(err);}
            if(user) {
                return done(null, false, {message: 'Létező felhasználó'});
            }
            req.app.models.user.create(req.body).then(function (user){
                return done(null, user);
            }).catch(function (err){
                return done(null, false, {message: err.details });
            })
        });
    }
));

//Stratégia
passport.use('local', new LocalStrategy({
    usernameField: 'username', 
    passwordField: 'password', 
    passReqToCallback: true,
    },
    function(req, username, password, done){
        req.app.models.user.findOne({username: username}, function(err, user){
            if(err) {return done(err)};
            if(!user || !user.validPassword(password)){
                return done(null, false, {message: "Helytelen adatok"});
            }
            return done(null, user);
        });
    }
));

//Middleware segésfv
function setLocalsForLayout(){
    return function(req, res, next) {
        res.locals.loggedIn = req.isAuthenticated();
        res.locals.user = req.user;
        next();
    }
}

function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()) { return next(); }
    res.redirect('/login');
}

function andRestrictedTo(role){
    return function(req, res, next) {
        if(req.user.role == role) {
            next();
        } else {
            next(new Error('Unauthorized'));
        }
    }
}

//--------------------------
// Express app

var app = express();

//config
app.set('views', './views');
app.set('view engine', 'hbs');

//Middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(session({
    cookie: {maxAge: 60000},
    secret: 'Na vajon mi ez?', 
    resave: false, 
    saveUninitialized: false,
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use(setLocalsForLayout());

//endpoints
app.use('/', indexController);
app.use('/posts', ensureAuthenticated, postController);
app.use('/login', loginController);
/*
app.get('/operator', ensureAuthenticated, andRestrictedTo('operator'), function(req, res) {
    res.end('operator');
}); 
*/
app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

app.use('/delete/:id', ensureAuthenticated, function(req, res){
    req.app.models.post.destroy({ id: req.params.id })
    .then(function(){
        req.flash('success', 'Bejegyzés törölve');
        res.redirect("/posts/list");
    })
    .catch(function(){
        req.flash('error', 'Hiba történt!');
        res.redirect('/posts/list');
    });
});

//ORM példány
var orm = new Waterline();
orm.loadCollection(Waterline.Collection.extend(require('./models/post')));
orm.loadCollection(Waterline.Collection.extend(require('./models/user')));

//ORM indítása
orm.initialize(waterlineConfig, function(err, models){
    if(err) throw err;
    
    app.models = models.collections;
    app.connections = models.connections;
    //Start server
    var port = process.env.PORT;
    var host = process.env.IP;
    var server = app.listen(port, host, function(){console.log('A szerver fut');});
    
    console.log('ORM elindítva.');
})
