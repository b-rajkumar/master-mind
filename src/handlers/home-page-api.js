const serveHomePage = (req, res) => {
  res.sendFile(`${process.env.PWD}/resources/pages/index.html`);
};

module.exports = { serveHomePage };
