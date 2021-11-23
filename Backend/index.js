const express = require('express');
const pug = require('pug');
const path = require('path');
const routes = require('./routes/routes');
const expressSession = require('express-session');
const loginAuth = require('./hellohahaha/loginAuth');

const app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

app.use(express.static(path.join(__dirname, '/public')));

// app.use(loginAuth.checkAuth);

app.use(expressSession({
    secret: 'yoMama',
    saveUninitialized: true,
    resave: true
}));

const urlencodedParser = express.urlencoded({
    extended: false
});

app.get('/', routes.login);
app.post('/', urlencodedParser, routes.loginSubmit)
app.get('/join', routes.createNewUser);
app.get('/home', routes.home);
app.get('/profile', routes.profile);
app.get('/play', routes.play);
app.get('/make', routes.createLib);

app.listen(3000);