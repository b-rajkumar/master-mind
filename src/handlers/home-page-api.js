const serveHomePage = (req, res) => {
  res.sendFile(`${process.env.PWD}/resources/index.html`);
};

module.exports = { serveHomePage };
