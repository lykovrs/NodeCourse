// слишком простой чат, в коде есть минимум 7 серьёзных ошибок - КАКИХ?
const http = require('http');
const fs = require('fs');

let clients = [];

http.createServer((req, res) => {

  switch (req.method + ' ' + req.url) {
  case 'GET /':
    // 1. нет обработки ошибок
    // 2. нет обработки обрыва соединениия
    // content-type ?
    fs.createReadStream('index.html').pipe(res);
    break;

  case 'GET /subscribe':
    console.log("subscribe");
    // 3. нет обработки обрыва соединения
    clients.push(res);
    break;

  case 'POST /publish':
    // 4. кодировка (может быть разбиение посреди символа)
    let body = '';

    req
      .on('data', data => {
        // 5. размер запроса может быть большим (надо проверять длину чанков)
        body += data;
      })
      .on('end', () => {
        // 6. try/catch
        body = JSON.parse(body);

        console.log("publish '%s'", body.message);

        clients.forEach(res => {
          // 7. body.message - toString
          res.end(body.message);
        });

        clients = [];

        res.end("ok");
      });

    break;

  default:
    res.statusCode = 404;
    res.end("Not found");
  }


}).listen(3000);
