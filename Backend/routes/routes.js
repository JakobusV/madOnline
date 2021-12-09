const config = require('../config.json');
const {MongoClient, ObjectId} = require('mongodb');
const { passOffLib } = require('../scripts/regexLib');

const url = 'mongodb+srv://admin:admin@cluster0.up6aq.mongodb.net/myData?retryWrites=true&w=majority';
const client = new MongoClient(url);

const dbName = 'madOnline';
const db = client.db(dbName);
const collectionLib = db.collection('Lib');
const collectionUser = db.collection('LibUser');

exports.login = (req, res) => {
    res.render('login', {
        title: 'Mad-Login'
        , config
    });
}

exports.home = (req, res) => {
    res.render('home', {
        title: 'Mad-Home page', profile: req.session.user.username
        , config
    });
}

exports.createNewUser = (req, res) => {
    res.render('createNewUser', {
        title: "Mad-New user"
        , config
    });
}

exports.editUser = async (req, res) => {
    await client.connect();
    const User = await collectionUser.findOne({ "UserName": req.session.user.username });
    await client.close();
    res.render('edit', {
        title: "Edit Settings"
        , config
        , User
    });
}

exports.playShuffle = async (req, res) => {
    await client.connect();
    const AllLib = await collectionLib.find({}).toArray();
    await client.close();
    const keys = Object.keys(AllLib);
    const chosenLib = Math.floor(Math.random() * keys.length);
    const urlPlay = '/play/' + ObjectId(AllLib[keys[chosenLib]]._id)
    console.log(AllLib[keys[chosenLib]]);
    console.log(urlPlay);
    res.redirect(urlPlay);
}

exports.play = async (req, res) => {
    await client.connect();
    const Lib = await collectionLib.findOne({ "_id":ObjectId(req.params.id) });
    await client.close();
    console.log(Lib);
    const details = {}
    details.title = Lib.Title;
    details.creator = Lib.Creator;
    details.id = ObjectId(Lib._id);
    const blanks = await passOffLib(Lib.Content);
    res.render('enterBlank', {
        title: "Enter In The Blanks!"
        , details
        , blanks
        , config
    });
}

exports.starwars = async (req, res) => {
    res.render('starWars', {
        title: "Star-Wars"
        , config
    });
}

exports.viewLib = (req, res) => {
    res.render('viewLib', {
        title: "View Madlib", profile: req.session.user.username
        , config
    });
}

exports.createLib = (req, res) => {
    res.render('createNewLib', {
        title: "Mad-Lib maker", profile: req.session.user.username
        , config
    });
}

exports.profile = async (req, res) => {
    try {
        await client.connect();
        const User = await collectionUser.findOne({ "UserName": req.params.id });
        const madeLibs = await collectionLib.find({ "Creator": User.UserName }).toArray();
        await client.close();
        res.render('profile', {
            title: "Mad-Profile", profile: req.session.user.username
            , config
            , User
            , MadeLibs: madeLibs
            , SavedLibs: 0
        });
    } catch(err) {
        console.log(err);
        res.redirect('/lost');
    }
}