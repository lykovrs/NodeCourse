const assert = require("assert");
const request = require("request");
const app = require("../index");
const fs = require("fs");

var server;

describe("Testing server", () => {
  describe("GET", () => {
    describe("get index.html", () => {
      before(done => {
        console.log("tests start");
        server = app.listen(3000, "127.0.0.1", () =>
          console.log("http://127.0.0.1:3000/"),
        );

        done();
      });

      it("should return index.html", async () => {
        await request("http://127.0.0.1:3000", function(error, response) {
          assert.equal(response.headers["content-type"], "text/html");
        });
      });

      after(done => {
        server.close();
        done();
      });
    });
  });
});

