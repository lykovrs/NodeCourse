const {Server} = require('http');

const serv = require('utils/server-inc');

const server = new Server(serv);

server.listen(8000);

// set NODE_PATH=. && node server-count.js // windows
// NODE_PATH=. node server-count.js // mac/linux
