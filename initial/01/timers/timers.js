// В какой момент срабатывают - до или после чтения файла?
const fs = require('fs');

// macroqueue = [fs.open, setTimeout, setImmediate, setImmediate, setImmediate]
// microqueue = [promise1, promise2, promise3, nextTick]

fs.readFile(__filename, (err, content) => {
  console.log('read!'); // 4
});

setImmediate(() => {
  console.log('immediate'); // 5
});

new Promise(resolve => {
  resolve('promise1'); // 3
}).then(console.log);

new Promise(resolve => {
  resolve('promise2'); // 3
}).then(console.log);

new Promise(resolve => {
  resolve('promise3'); // 3
}).then(console.log);

process.nextTick(() => {
  console.log('nextTick'); // 2
});

console.log('start!'); // 1

// libuv + V8 = nodejs

// function asyncFunction(arg1, arg2, cb) {
//   if (typeof arg1 !== Number || typeof arg2 !== Number)
//     return cb(new Error('...'));
//
//   setTimeout(() => cb(null, arg1 + arg2), 100);
// }
