let connection = new connection();

connection.on("connect", err => {
    if (err) {
        console.error(err.message);
    } else {
        console.log("Working!");
    }
});