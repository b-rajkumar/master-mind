const serveGamePage = (req, res) => {
  res.sendFile(`${process.env.PWD}/resources/master-mind.html`);
};

module.exports = { serveGamePage };
