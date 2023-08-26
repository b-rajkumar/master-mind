const express = require("express");
const { isUserPresent } = require("../middlewares/authenticate");
const { parseCookies } = require("../middlewares/cookie-parser");
const { logRequest } = require("../middlewares/logger");
const { serveHomePage } = require("./home-page-api");
const { serveLoginPage, registerUser } = require("./login-page-api");

const setupApp = app => {
  app.use(logRequest);
  app.use(express.urlencoded());
  app.use(parseCookies);
  app.use(isUserPresent);
  app.get("/", serveHomePage);
  app.get("/login", serveLoginPage);
  app.post("/login", registerUser);
};

module.exports = { setupApp };
