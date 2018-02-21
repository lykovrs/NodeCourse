const assert = require("assert");
const request = require("request");
const server = require("../server");
const fs = require("fs");

let app;

before(() => {
  console.log("tests start");
  app = server.listen(3000, "127.0.0.1", () =>
    console.log("http://127.0.0.1:3000/"),
  );
});

after(() => {
  app.close(() => {
    console.log("shot down");
  });
});
describe("Testing server", () => {
  describe("GET", () => {
    describe("get index.html", () => {
      it("should return index.html", done => {
        request("http://127.0.0.1:3000", function(error, response, body) {
          if (error) {
            return done(error);
          }

          const fileContent = fs.readFileSync("public/index.html", {
            encoding: "utf-8",
          });

          assert.equal(response.headers["content-type"], "text/html");
          assert.equal(body, fileContent);

          done();
        });
      });
    });
  });

  describe("Create and remove file", () => {
    describe("create test.test", () => {
      it("should return response status 404, without file name", done => {
        request.post(
          { url: "http://127.0.0.1:3000", form: { key: "value" } },
          function(error, httpResponse, body) {
            if (error) {
              return done(error);
            }

            assert.equal(httpResponse.statusCode, 404);

            done();
          },
        );
      });

      fs.unlink("files/test.test");

      it("should return response status 200, with file name", done => {
        request.post(
          { url: "http://127.0.0.1:3000/test.test", form: { key: "value" } },
          function(error, httpResponse, body) {
            if (error) {
              return done(error);
            }

            assert.equal(httpResponse.statusCode, 200);

            done();
          },
        );
      });

      it("should return response status 409, if file exist", done => {
        request.post(
          { url: "http://127.0.0.1:3000/test.test", form: { key: "value" } },
          function(error, httpResponse, body) {
            if (error) {
              return done(error);
            }

            assert.equal(httpResponse.statusCode, 409);

            done();
          },
        );
      });
    });
  });
});
