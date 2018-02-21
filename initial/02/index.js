/*
  1. Readable
  2. Writable
  3. Duplex
  4. Transform
*/

const fs = require('fs');

// const stream = require('stream');
// new stream.Readable(); // 16kb
// new stream.Writable();

const stream = fs.createReadStream(__filename);

// console.log(stream);
/*
  __buffer: [] // 64kb
*/

// paused | flowing

// stream.on('data', chunk => {})
// stream.pipe(streamOut) / stream.unpipe(streamOut)
// stream.resume() / stream.pause()

// stream.on('readable', () => {
//   const chunk = stream.read();
//   console.log(chunk);
// });
