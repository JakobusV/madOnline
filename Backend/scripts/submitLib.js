const config = require('../config.json');
const {MongoClient, ObjectId} = require('mongodb');

const url = 'mongodb+srv://admin:admin@cluster0.up6aq.mongodb.net/myData?retryWrites=true&w=majority';
const client = new MongoClient(url);

const dbName = 'madOnline';
const db = client.db(dbName);
const collectionLib = db.collection('Lib');
const collectionUser = db.collection('LibUser');

exports.finishLib = (req, res) => {

}