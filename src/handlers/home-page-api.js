const serveHomePage = (req, res) => {
  res.sendFile(`${process.env.PWD}/private/index.html`);
};

module.exports = { serveHomePage };
