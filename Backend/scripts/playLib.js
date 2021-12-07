
const options = { keepNulls: true };
let readLibID

exports.readLib = (req, res) => {

    const sqlconnection = new Connection(config);
    console.log("Read lib method: readLib");
    try {
        var retval = '';
        sqlconnection.on('connect', (err) => {
            if(err) {
                console.log(err.message)
            } else {
                const request = new Request("Select * from Libs where ID=\'" + "1" + "\'", function(err, rowCount, rows) {
                    if (err){
                        console.log('Error');
                        sqlconnection.close();
                    } else {
                        sqlconnection.close();
                        if(rows[0]) {
                            
                            readLib = {
                                ID: rows[0][0].value,
                                Title: rows[0][1].value,
                                CreatorID: rows[0][2].value,
                                LibDescription: rows[0][3].value,
                                Content: rows[0][4].value
                            }

                            readLibID = readLib.ID

                            // bcrypt.compare(req.body.password, rows[0][2].value, (err, result) => {
                            //     if(result) {
                            //         req.session.user = {
                            //             isAuthenticated: true,
                            //             id: rows[0][0].value,
                            //             username: rows[0][1].value
                            //         }
                            //         console.log("SUCCESS :: CORRECT PASSWORD");
                            //         res.redirect('/profile');
                            //     } else {
                            //         console.log("FAILED :: WRONG PASSWORD");
                            //         res.redirect('/');
                            //     }
                            // });
                        } else {
                            res.redirect('/home');
                        }
                    }
                });
                sqlconnection.execSql(request);
            }
        });
        sqlconnection.connect();
    } catch (err) {
        console.log("Read lib method: readLib: Error");
    }
}

exports.submitDoneLib = (req, res) => {

    if(req.body.content === null || req.body.content == "") {
        res.redirect('/play');
    } else {
        const sqlconnection = new Connection(config);
        console.log("Submit done lib method: submitDoneLib");
        try {
            var retval = '';
            sqlconnection.on('connect', (err) => {
                if(err) {
                    console.log(err.message)
                } else {
                    let donelib = {
                        LibID: readLibID,
                        PlayerID: req.session.user.id,
                        PlayerContent: req.body.content//regexPlayerContent
                    };
                    const bulkLoad = sqlconnection.newBulkLoad('[dbo].[DoneLibs]', options, function (error, rowCount) {
                        if(error) {
                            console.log(error);
                            res.redirect('/home');
                        } else {
                            console.log('inserted %d rows', rowCount);
                            res.redirect('/viewLib');
                        }
                    });
                    bulkLoad.addColumn('LibID', TYPES.Int, { nullable: true });
                    bulkLoad.addColumn('PlayerID', TYPES.Int, { nullable: true });
                    bulkLoad.addColumn('PlayerContent', TYPES.NVarChar, { length: 200, nullable: true });
                    // console.log("req.body :: DoneLib")
                    // console.log(req.body.title + " :: " + donelib.Title);
                    // console.log(req.session.user.id + " :: " + donelib.CreatorID);
                    // console.log(req.body.description + " :: " + donelib.LibDescription);
                    sqlconnection.execBulkLoad(bulkLoad, [
                        donelib
                    ]);
                }
            });
            sqlconnection.connect();
        } catch (err) {
            console.log("playLib method: playLib: Error");
        }
    }
}

