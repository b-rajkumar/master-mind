const { isUserPresent } = require("../middlewares/authenticate");
const { parseCookies } = require("../middlewares/cookie-parser");
const logRequest = require("../middlewares/logger");

const setupApp = app => {
  app.use(logRequest);
  app.use(parseCookies);
  app.use(isUserPresent);
};

module.exports = { setupApp };
