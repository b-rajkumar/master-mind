const express = require("express");
const { setupApp } = require("./handlers/setup");

const createApp = (users = []) => {
  const app = express();
  app.users = users;
  setupApp(app);

  return app;
};

module.exports = createApp;
