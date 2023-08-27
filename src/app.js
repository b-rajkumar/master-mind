const express = require("express");
const { setupApp } = require("./setup");

const createApp = masterMindDB => {
  const app = express();
  app.masterMindDB = masterMindDB;
  setupApp(app);

  return app;
};

module.exports = { createApp };
