const fs = require("fs");

module.exports = function(req, res) {
  fs.exists("files/example.txt", exists => {
    if (exists) {
      res.statusCode = 409;
      res.end("file already exist");
    } else {
      let body = "";

      req.on("data", function(data) {
        body += data;

        // Too much POST data, kill the connection!
        // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
        if (body.length > 1e6) {
          req.connection.destroy();
          res.statusCode = 413;
          res.end("data limit error");
        }
      });

      req.on("end", function() {
        const file = fs.createWriteStream("files/example.txt");
        file.end(body);

        res.statusCode = 200;
        res.end("OK");
      });
    }
  });
};
