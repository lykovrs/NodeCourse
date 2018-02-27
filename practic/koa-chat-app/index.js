// A "closer to real-life" app example
// using 3rd party middleware modules
// P.S. MWs calls be refactored in many files

// long stack trace (+clarify from co) if needed

if (process.env.TRACE) {
  require("./libs/trace");
}

const Koa = require("koa");
const app = new Koa();

const config = require("config");

const path = require("path");
const fs = require("fs");

const handlers = fs.readdirSync(path.join(__dirname, "handlers")).sort();
handlers.forEach(handler => {
  const h = require("./handlers/" + handler);
  h.init(app);
});

// can be split into files too
const Router = require("koa-router");

const router = new Router();

router.get("/chat", async function(ctx, next) {
  let count = ctx.session.count || 0;
  ctx.session.count = ++count;

  ctx.body = ctx.render("./templates/index.pug", {
    user: "John",
    count,
  });
});

let clients = [];

router.get("/subscribe", async function(ctx, next) {
  ctx.set("Cache-Control", "no-cahce,must-revalidate");
  const promise = new Promise((resolve, reject) => {
    clients.push(resolve);

    ctx.res.on("close", () => {
      clients.splice(clients.indexOf(resolve), 1);
      const error = new Error("Connection closed");
      error.code = "ECONNRESET";
      reject(error);
    });
  });

  let message;
  try {
    message = await promise;
  } catch (error) {
    if (error.code === "ECONNRESET") return;
    throw error;
  }

  ctx.body = message;
});

router.post("/publish", async ctx => {
  const message = ctx.request.body.message;
  clients.forEach(client => {
    client(String(message));
  });
  clients = [];
  ctx.status = 200;
  ctx.body = "ok";
});

router.get("/", async function(ctx) {
  ctx.redirect("/chat");
});

app.use(router.routes());

app.listen(config.get("port"));
