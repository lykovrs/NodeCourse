/**
 ЗАДАЧА
 Написать HTTP-сервер для загрузки и получения файлов
 - Все файлы находятся в директории files
 - Структура файлов НЕ вложенная.

 - Виды запросов к серверу
    GET / - index.html

   GET /file.ext
   - выдаёт файл file.ext из директории files,

   POST /file.ext
   - пишет всё тело запроса в файл files/file.ext и выдаёт ОК
   - если файл уже есть, то выдаёт ошибку 409
   - при превышении файлом размера 1MB выдаёт ошибку 413

   DELETE /file.ext
   - удаляет файл
   - выводит 200 OK
   - если файла нет, то ошибка 404

 Вместо file может быть любое имя файла.
 Так как поддиректорий нет, то при наличии / или .. в пути сервер должен выдавать ошибку 400.

- Сервер должен корректно обрабатывать ошибки "файл не найден" и другие (ошибка чтения файла)
- index.html или curl для тестирования

 */

// Пример простого сервера в качестве основы

"use strict";
const url = require("url");
const fs = require("fs");
const sendFile = require("./sendFile");
const createFile = require("./createFile");

require("http")
  .createServer(function(req, res) {
    let pathname = decodeURI(url.parse(req.url).pathname);

    switch (req.method) {
      case "GET":
        if (pathname === "/") {
          const file = new fs.ReadStream(__dirname + "/public/index.html");
          sendFile(file, res);
          return;
        }

      case "POST":
        createFile(req, res);
        return;

      case "DELETE":
        fs.exists("files/example.txt", exists => {
          if (exists) {
            fs.unlink("files/example.txt", err => {
              if (err) throw err;
              console.log("successfully deleted example.txt");
            });

            res.statusCode = 200;
            res.end("OK");
          } else {
            res.statusCode = 404;
            res.end("file not found");
          }
        });

        return;

      default:
        res.statusCode = 502;
        res.end("Not implemented");
    }
  })
  .listen(4000);
