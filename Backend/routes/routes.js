const config = require('../config.json');

exports.login = (req, res) => {
    res.render('login', {
        title: 'Mad-Login'
        , config
    });
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

exports.profile = (req, res) => {
    res.render('profile', {
        title: "Mad-Profile"
        , config
    });
}