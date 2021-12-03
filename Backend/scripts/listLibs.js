const { Connection, Request } = require("tedious");

class Lib{
    constructor(id, title, creator) {
        this.id = id
        this.title = title
        this.creator = creator
    }
}

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


exports.getAll = (req, res) => {
    const sqlconnection = new Connection(config);
    console.log("Log auth method: checkLogin");
    try {
        var retval = '';
        sqlconnection.on('connect', (err) => {
            if(err) {
                console.log(err.message)
            } else {
                const request = new Request("Select * from Libs where CreatorID=" + req.session.user.id, function(err, rowCount, rows) {
                    if (err){
                        console.log('Error');
                        sqlconnection.close();
                    } else {
                        sqlconnection.close();
                        let allLibs = []
                        rows.forEach(lib => {
                            let newLib = new Lib(lib[0].value, lib[1].value, lib[2].value);
                            allLibs.push(newLib);
                        });
                        res.send(allLibs);
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