const isValidColorCombination = colorCombination => {
  const colors = ["R", "G", "B", "W", "Y", "O", "P", "N"];

  return [...colorCombination.toUpperCase()].every(color =>
    colors.includes(color)
  );
};

const sendInvalidData = res => {
  res
    .status(400)
    .end("Expected '{guess: colorCombination}' in json format as Request body");
};

const sendBadRequest = res => {
  res.status(400).end("Game is over (or) not exists");
};

const handleValidateGuess = (req, res) => {
  const player = req.cookies.name;
  const games = req.app.games;
  const game = games[player];
  const guess = req.body.guess;

  if (!game || game.isGameOver()) return sendBadRequest(res);
  if (!guess || typeof guess !== "string") return sendInvalidData(res);

  const isValidGuess = isValidColorCombination(guess);
  if (!isValidGuess) return sendInvalidData(res);

  const result = game.validateGuess(guess);
  if (result.isGameOver) {
    games[player] = undefined;
    req.app.masterMindDB.addGameStats(player, game.gameStats());
  }
  res.send(result);
};

module.exports = { handleValidateGuess };
