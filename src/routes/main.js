const khoahocRouter = require("./khoahoc.js");
const baihocRouter = require("./baihoc.js");
const authRouter = require("./auth.js");
const cauhoiRouter = require("./cauhoi.js");

function route(app) {
  app.use("/api/khoahoc", khoahocRouter);

  app.use("/api/baihoc", baihocRouter);

  app.use("/api/auth", authRouter);

  app.use("/api/cauhoigame", cauhoiRouter);
}

module.exports = route;
