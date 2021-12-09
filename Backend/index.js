const express = require('express');
const pug = require('pug');
const path = require('path');
const routes = require('./routes/routes');
const expressSession = require('express-session');
const loginAuth = require('./scripts/loginAuth');
const newUser = require('./scripts/newUser');
const newLib = require('./scripts/newLib');
const { passOffLib } = require('./scripts/regexLib');
const listLibs = require('./scripts/listLibs');
const editUser = require('./scripts/editUser');
const submitLib = require('./scripts/submitLib');

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

app.get('/lost', (req, res) => {res.render('lost', {title: "404 Not Found"})});
app.get('/', routes.login);
app.post('/', urlencodedParser, loginAuth.checkLogin);
app.get('/star', routes.starwars);
app.get('/join', routes.createNewUser);
app.post('/join', urlencodedParser, newUser.addUser);
app.get('/edit', checkAuth, routes.editUser);
app.post('/update', checkAuth, urlencodedParser, editUser.updateUser)
app.get('/home', checkAuth, routes.home);
app.get('/profile/:id', checkAuth, routes.profile);
app.get('/play', checkAuth, routes.playShuffle);
app.get('/play/:id', checkAuth, routes.play);
app.post('/play/:id', urlencodedParser, checkAuth, submitLib.finishLib);
app.get('/view/:id', checkAuth, routes.viewLib);
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

app.get('/Starapi', async (req, res) => {
    console.log('RUNNING TO THE API BE RIGHT BACK');
});
app.get('/api', checkAuth, listLibs.getAll);

app.listen(process.env.PORT || 3000);