const config = require('../config.json');
const loginAuth = require('../scripts/loginAuth');

exports.login = (req, res) => {
    // logAu.test();
    res.render('login', {
        title: 'Mad-Login'
        , config
    });
}

exports.loginSubmit = (req, res) => {
    // loginAuth.checkLogin(req, res);
    
    // if(checkloginSuccess > 0) {//SUCCESSFUL LOGIN
    //     res.redirect('home');
    // } else {//FAILED LOGIN
    //     res.render('login', {
    //         title: 'Mad-Login'
    //         , config
    //     });
    // }
}

exports.home = (req, res) => {
    res.render('home', {
        title: 'Mad-Home page'
        , config
    });
}

exports.createNewUser = (req, res) => {
    res.render('createNewUser', {
        title: "Mad-New user"
        , config
    });
}

exports.play = (req, res) => {
    res.render('play', {
        title: "Mad-Lib!"
        , config
    });
}

exports.createLib = (req, res) => {
    res.render('createNewLib', {
        title: "Mad-Lib maker"
        , config
    });
}

exports.profile = async (req, res) => {
    res.render('profile', {
        title: "Mad-Profile"
        , config
    });
}