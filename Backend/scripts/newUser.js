const { Connection, Request, TYPES } = require("tedious");
const bcrypt = require("bcryptjs");

let salt = bcrypt.genSaltSync(10);

const config = {
    authentication: {
        options: {
            userName: "Madmin", 
            password: "JJCZ2023-"
        },
        type: "default"
    },
    server: "pro150server.database.windows.net", 
    options: {
        rowCollectionOnRequestCompletion: true,
        database: "MadLibs", 
        encrypt: true
    }
};

const options = { keepNulls: true };

exports.addUser = (req, res) => {
    if(req.body.password === null || req.body.password == "") {
        res.redirect('/join');
    } else {
        const sqlconnection = new Connection(config);
        console.log("newUser method: addUser");
        try {
            var retval = '';
            sqlconnection.on('connect', (err) => {
                if(err) {
                    console.log(err.message)
                } else {
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(req.body.password, salt, (err, my_hash) => {
                            let user = {
                                UserName: req.body.username,
                                EncPassword: my_hash,
                                UserDescription: req.body.bio,
                                pfp: req.body.pfp
                            };
                            const bulkLoad = sqlconnection.newBulkLoad('LibUser', options, function (error, rowCount) {
                                console.log('inserted %d rows', rowCount);
                                res.redirect('/');
                            });
                            bulkLoad.addColumn('UserName', TYPES.NVarChar, { length: 50, nullable: true });
                            bulkLoad.addColumn('EncPassword', TYPES.NVarChar, { length: 100, nullable: true });
                            bulkLoad.addColumn('UserDescription', TYPES.NVarChar, { length: 300, nullable: true });
                            bulkLoad.addColumn('pfp', TYPES.TinyInt, { nullable: true });
                            console.log(req.body.username);
                            console.log(req.body.password);
                            console.log(user);
                            sqlconnection.execBulkLoad(bulkLoad, [
                                user
                            ]);
                        });
                    });
                }
            });
            sqlconnection.connect();
        } catch (err) {
            console.log("newUser method: addUser: Error");
        }
    }
}