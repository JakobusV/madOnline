import {returnConnection} from './connection.js';

let connection = returnConnection();

connection.on("connect", err => {
    if (err) {
        console.error(err.message);
    } else {
        console.log("Working!");
    }
});
