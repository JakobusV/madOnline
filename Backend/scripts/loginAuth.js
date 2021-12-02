const { Connection, Request } = require("tedious");
const bcrypt = require("bcryptjs");

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


exports.checkLogin = (req, res) => {
    const sqlconnection = new Connection(config);
    console.log("Log auth method: checkLogin");
    try {
        var retval = '';
        sqlconnection.on('connect', (err) => {
            if(err) {
                console.log(err.message)
            } else {
                const request = new Request("Select * from LibUser where UserName=\'" + req.body.username + "\'", function(err, rowCount, rows) {
                    if (err){
                        console.log('Error');
                        sqlconnection.close();
                    } else {
                        sqlconnection.close();
                        if(rows[0]) {
                            bcrypt.compare(req.body.password, rows[0][2].value, (err, result) => {
                                if(result) {
                                    req.session.user = {
                                        isAuthenticated: true,
                                        id: rows[0][0].value,
                                        username: rows[0][1].value
                                    }
                                    console.log("SUCCESS :: CORRECT PASSWORD");
                                    res.redirect('/profile');
                                } else {
                                    console.log("FAILED :: WRONG PASSWORD");
                                    res.redirect('/');
                                }
                            });
                        } else {
                            res.redirect('/');
                        }
                    }
                });
                sqlconnection.execSql(request);
            }
        });
        sqlconnection.connect();
    } catch (err) {
        console.log("Log auth method: checkLogin: Error");
    }
}