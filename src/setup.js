const express = require("express");
const { isUserPresent } = require("./middlewares/authenticate");
const { parseCookies } = require("./middlewares/cookie-parser");
const { logRequest } = require("./middlewares/logger");
const { serveHomePage } = require("./handlers/home-page-api");
const { serveLoginPage, registerUser } = require("./handlers/login-page-api");
const { handlePlayerStats } = require("./handlers/player-stats-api-test");
const { serveGamePage } = require("./handlers/game-page-api");

const setupApp = app => {
  app.use(logRequest);
  app.use(express.urlencoded({ extended: true }));
  app.use(parseCookies);
  app.use(isUserPresent);
  app.get("/", serveHomePage);
  app.get("/login", serveLoginPage);
  app.post("/login", registerUser);
  app.get("/player-stats", handlePlayerStats);
  app.get("/game", serveGamePage);
};

module.exports = { setupApp };
