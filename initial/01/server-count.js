const {Server} = require('http');

let i = 0;
const server = new Server((req, res) => {  
  i+=10;
  res.end(i.toString()); // (!!! toString)
});

server.listen(8000);
