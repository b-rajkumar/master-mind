const MasterMind = require("../models/master-mind");
const _ = require("lodash");

const generateSecretColorCombination = () => {
  const colors = ["R", "G", "B", "W", "Y", "O", "P", "N"];
  const shuffledColors = _.shuffle(colors);
  const secretColorCombination = shuffledColors.slice(0, 5).join("");

  return secretColorCombination;
};

const handleGameStart = (req, res) => {
  const player = req.cookies.name;
  const app = req.app;
  let game = app.games[player];

  if (!game) {
    const secretColorCombination = generateSecretColorCombination();
    console.log(secretColorCombination);
    game = new MasterMind(secretColorCombination);
    app.games[player] = game;
  }

  res.send(game.gameStats());
};

module.exports = { handleGameStart };
