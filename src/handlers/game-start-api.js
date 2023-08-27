const MasterMind = require("../models/master-mind");

const handleGameStart = (req, res) => {
  const player = req.cookies.name;
  const app = req.app;
  let game = app.games[player];

  if (!game) {
    game = new MasterMind();
    app.games[player] = game;
  }

  res.send(game.gameStats());
};

module.exports = { handleGameStart };
