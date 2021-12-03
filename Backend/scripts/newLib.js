const { Connection, Request, TYPES } = require("tedious");
const bcrypt = require("bcryptjs");
const madEx = require("./regexLib");

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

exports.addLib = async (req, res) => {
    if(req.body.content === null || req.body.content == ""
        || req.body.title === null || req.body.title == "") {
        res.redirect('/make');
    } else {
        let result = await madEx.passOffLib(req.body.content);
        console.log(result);
        if(result == 0) {
            console.log("passOffRegex failed");
        } else {
            const sqlconnection = new Connection(config);
            console.log("newLib method: addLib");
            try {
                var retval = '';
                sqlconnection.on('connect', (err) => {
                    if(err) {
                        console.log(err.message)
                    } else {
                        let lib = {
                            Title: req.body.title,
                            CreatorID: req.session.user.id,
                            LibDescription: "NaN",
                            Content: req.body.content
                        };
                        const bulkLoad = sqlconnection.newBulkLoad('[dbo].[Libs]', options, function (error, rowCount) {
                            if(error) {
                                console.log(error);
                                res.redirect('/make');
                            } else {
                                console.log('inserted %d rows', rowCount);
                                res.redirect('/profile');
                            }
                        });
                        bulkLoad.addColumn('Title', TYPES.NVarChar, { length: 40, nullable: false });
                        bulkLoad.addColumn('CreatorID', TYPES.Int, { nullable: true });
                        bulkLoad.addColumn('LibDescription', TYPES.NVarChar, { length: 100, nullable: true });
                        bulkLoad.addColumn('Content', TYPES.NVarChar, { length: 400, nullable: false });
                        console.log("req.body :: Lib")
                        console.log(req.body.title + " :: " + lib.Title);
                        console.log(req.session.user.id + " :: " + lib.CreatorID);
                        console.log(req.body.description + " :: " + lib.LibDescription);
                        console.log(req.body.content + " :: " + lib.Content);
                        sqlconnection.execBulkLoad(bulkLoad, [
                            lib
                        ]);
                    }
                });
                sqlconnection.connect();
            } catch (err) {
                console.log("newLib method: addLib: Error");
            }
        }
    }
}