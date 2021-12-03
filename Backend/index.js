const express = require('express');
const pug = require('pug');
const path = require('path');
const routes = require('./routes/routes');
const expressSession = require('express-session');
const loginAuth = require('./scripts/loginAuth');
const newUser = require('./scripts/newUser');

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
app.post('/', urlencodedParser, loginAuth.checkLogin)
app.get('/join', routes.createNewUser);
app.post('/join', urlencodedParser, newUser.addUser);
app.get('/home', routes.home);
app.get('/profile', routes.profile);
app.get('/play', routes.play);
app.get('/viewLib', routes.viewLib);
app.get('/make', routes.createLib);

app.listen(3000);