exports.displayRandomLib = async (req, res) => {
    // if(req.body.content === null || req.body.content == ""
    //     || req.body.title === null || req.body.title == "") {
    //     res.redirect('/make');
    // } else {
    //     if(madEx.passOffLib(req.body.content) == 0) {
    //         res.redirect('/make');
    //     }
    //     console.log("newLib method: displayRandomLib");
    //     await client.connect();
    //     let lib = {
    //         Title: req.body.title,
    //         Creator: req.session.user.username,
    //         LibDescription: "req.body.description",
    //         Content: req.body.content
    //     };
    //     const insertResult = await collection.insertOne(lib);
    //     console.log(insertResult);
    //     client.close();
        res.redirect('/playLib');
    }
// }