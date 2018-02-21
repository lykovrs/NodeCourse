const fs = require('fs');

// fs.readFile(f, cb)

function readFile(filePath) {
  /* ваш код */
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, content) => { // thunk
      if (err) return reject(err);

      // myStore.putToCache(content);
      resolve(content);
    });
  });
}

readFile(__filename).then(
  console.log,
  console.error
);
