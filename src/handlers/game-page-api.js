const serveGamePage = (req, res) => {
  res.sendFile(`${process.env.PWD}/resources/pages/master-mind.html`);
};

module.exports = { serveGamePage };
