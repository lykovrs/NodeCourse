// function asyncSum(a, b, cb) {
//   if (a < b) {
//     process.nextTick(() => cb(new Error('wrong arguments')));
//     return;
//   }
//
//   setTimeout(() => {
//     cb(null, a + b)
//   }, 50);
// }
//
// function onSum(err, res) {
//   if (err) console.error(err);
//   else console.log(res);
// }
//
// asyncSum(1, 2, onSum);
//
// console.log('lala');
//
// const stream = require('stream');
//
// const s1 = new stream.Writable();
//
// s1.emit('error', new Error('1'));
//
// s1.on('error', err => console.log('Caught!'));

const fs = require('fs');

const s = fs.createReadStream(__filename, {highWaterMark: 10});

console.log(s._readableState);

s.on('readable', function onReadable() {
  console.log('=====');
  console.log(s._readableState);

  s.removeListener('readable', onReadable);
  console.log('=====');
  console.log(s._readableState);

  s.read();

  console.log('=====');
  console.log(s._readableState);
});
