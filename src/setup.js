const express = require("express");
const { isUserPresent } = require("./middlewares/authenticate");
const { parseCookies } = require("./middlewares/cookie-parser");
const { logRequest } = require("./middlewares/logger");
const { serveHomePage } = require("./handlers/home-page-api");
const { serveLoginPage, registerUser } = require("./handlers/login-page-api");
const { handlePlayerStats } = require("./handlers/player-stats-api-test");
const { serveGamePage } = require("./handlers/game-page-api");
const { handleGameStart } = require("./handlers/game-start-api");
const { handleValidateGuess } = require("./handlers/validate-guess-api");

const setupMiddleWares = app => {
  app.use(logRequest);
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(parseCookies);
  app.use(isUserPresent);
};

const setupApp = app => {
  setupMiddleWares(app);
  app.get("/", serveHomePage);
  app.get("/login", serveLoginPage);
  app.post("/login", registerUser);
  app.get("/player-stats", handlePlayerStats);
  app.get("/game", serveGamePage);
  app.get("/game/start", handleGameStart);
  app.post("/game/validate-guess", handleValidateGuess);
  app.use(express.static("./resources"));
};

module.exports = { setupApp };
