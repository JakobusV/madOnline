const { Connection, Request } = require("tedious");

// Create connection to database
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
        console.log("Working! :: Connection");
    }
});

connection.connect();

//To test in console, in the madOnline dir "node ./Backend/connection.js"
