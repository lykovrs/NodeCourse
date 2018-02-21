const fs = require('fs');

fs.unlink('example_file', (err) => { // macroqueue = [unlink]
  console.log('unlink');
});

const stat = fs.statSync('example_file'); // вклинись, выполнили операцию "на месте"
console.log('stat', stat);

const s = fs.createReadStream('example_file'); // macroqueue = [unlink, readStream]
s.on('error', (e) => console.error(e.code)); // ENOENT - файла нет к моменту чтения
