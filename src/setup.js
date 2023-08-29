const express = require("express");
const { isUserPresent } = require("./middlewares/authenticate");
const { parseCookies } = require("./middlewares/cookie-parser");
const { logRequest } = require("./middlewares/logger");
const { serveHomePage } = require("./handlers/home-page-api");
const {
  serveLoginPage,
  logInUser,
  logOutUser,
} = require("./handlers/login-page-api");
const { handlePlayerStats } = require("./handlers/player-stats-api-test");
const { serveGamePage } = require("./handlers/game-page-api");
const { handleGameStart } = require("./handlers/game-start-api");
const { handleValidateGuess } = require("./handlers/validate-guess-api");
const {
  serveRegisterPage,
  registerUser,
} = require("./handlers/register-page-api");

const setupMiddleWares = app => {
  app.use(logRequest);
  app.use(parseCookies);
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
};

const setupLoginControls = app => {
  app.get("/login", serveLoginPage);
  app.post("/login", logInUser);
  app.post("/register", registerUser);
  app.get("/register", serveRegisterPage);
  app.post("/logout", logOutUser);
};

const setupApp = app => {
  setupMiddleWares(app);
  setupLoginControls(app);
  app.use(express.static("./resources"));
  app.use(isUserPresent);
  app.get("/", serveHomePage);
  app.get("/player-stats", handlePlayerStats);
  app.get("/game", serveGamePage);
  app.get("/game/start", handleGameStart);
  app.post("/game/validate-guess", handleValidateGuess);
};

module.exports = { setupApp };
