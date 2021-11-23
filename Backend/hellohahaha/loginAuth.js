const { Connection, Request } = require("tedious");

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

const connection = new Connection(config);

// Attempt to connect and execute queries if connection goes through
connection.on("connect", err => {
    if (err) {
        console.error(err.message);
    } else {
        console.log("Working! :: loginAuth");
    }
});

connection.connect();

exports.checkAuth = (req, res, next) => {
    try {
        if(req.session.user && req.session.user.isAuthenticated) {
            next();
        } else {
            res.redirect('/');
        }
    } catch (error) {
        console.log(error)
        console.log("redirecting to login")
        res.redirect('/');
    }
}

exports.checkLogin = (user, pass) => {
    console.log("Log auth method: checkLogin");
    try {
        let users = findAll();
        users.forEach(user => {
            console.log(user);
            print(user);    
        });
        // if(user == "user" && pass == "pass")
        // {
        //     return 1
        // } else {
        //     return 0
        // }
        // console.log(demo);
    } catch (err) {
        console.log("OOPsy");
        return 0;
    }
}

const findAll = () => {
    const listUsers = [];
    let request = new Request("Select * from LibUser", (err, rowCount, rows) => {
        console.log("Finished: ", rowCount);
        return rows;
        // rows.forEach(user => {
        //     listUsers.push(user);
        // });
        // console.log(listUsers);
    });
    connection.execSql(request);
}