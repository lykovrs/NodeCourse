// mocha, (assert, chai, should, etc...)

var assert = require('assert');
var request = require('request');
const fs = require('fs');

const server = require('../server');

describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1,2,3].indexOf(4), -1);
    });
  });
});

describe('server tests', () => {
  let app;
  before((done) => {
    app = server.listen(3000, () => {
      done();
    });
  });

  after((done) => {
    app.close(() => done());
  });

  describe('GET', () => {

    describe('get index.html', () => {
      it('should return index.html', (done) => {
        request('http://localhost:3000', function (error, response, body) {
          if (error) {
            return done(error);
          }

          const fileContent = fs.readFileSync('public/index.html', {encoding: 'utf-8'});

          assert.equal(response.headers['content-type'], 'text/html');
          assert.equal(body, fileContent);

          done();
        });
      });
    });

  });

});
