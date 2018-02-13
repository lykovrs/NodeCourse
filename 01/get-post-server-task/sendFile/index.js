module.exports = function sendFile(file, res) {
    file.pipe(res);

    file.on("error", function(err) {
        res.statusCode = 500;
        res.end("Server Error");
        console.error(err);
    });

    file
        .on("open", function() {
            console.log("open");
        })
        .on("close", function() {
            console.log("close");
        });

    res.on("close", function() {
        file.destroy();
    });
}