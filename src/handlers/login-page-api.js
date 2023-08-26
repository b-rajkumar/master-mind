const serveLoginPage = (req, res, next) => {
  res.sendFile(`${process.env.PWD}/resources/login.html`);
};

module.exports = { serveLoginPage };
