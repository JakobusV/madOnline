const express = require('express');
const pug = require('pug');
const path = require('path');
const routes = require('./routes/routes');
const expressSession = require('express-session');
const loginAuth = require('./scripts/loginAuth');
const newUser = require('./scripts/newUser');
const newLib = require('./scripts/newLib');
const playLib = require('./scripts/playLib');


const app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

app.use(express.static(path.join(__dirname, '/public')));

app.use(expressSession({
    secret: 'yoMama',
    saveUninitialized: true,
    resave: true
}));

const checkAuth = (req, res, next) => {
    if(req.session.user && req.session.user.isAuthenticated) {
        next();
    } else {
        res.redirect('/');
    }
}

const urlencodedParser = express.urlencoded({
    extended: false
});

app.get('/', routes.login);
app.post('/', urlencodedParser, loginAuth.checkLogin);
app.get('/join', routes.createNewUser);
app.post('/join', urlencodedParser, newUser.addUser);
app.get('/home', checkAuth, routes.home);
app.get('/profile', checkAuth, routes.profile);
app.get('/play', checkAuth, routes.play);
app.post('/play', urlencodedParser, playLib.submitDoneLib);
app.get('/make', checkAuth, routes.createLib);
app.post('/make', urlencodedParser, checkAuth, newLib.addLib);
app.get('/logout', checkAuth, (req, res) => {
    req.session.destroy(err => {
        if(err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    });
});

app.listen(3000);