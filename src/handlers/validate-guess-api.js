const isValidColorCombination = colorCombination => {
  const colors = ["R", "G", "B", "W", "Y", "O", "P", "N"];

  return (
    colorCombination.length === 5 &&
    [...colorCombination.toUpperCase()].every(color => colors.includes(color))
  );
};

const sendInvalidData = res => {
  res.status(400).end(
    // eslint-disable-next-line max-len
    "Expected '{guess: colorCombination}' in json format and should only contain colors 'RGBWYOPN' as Request body"
  );
};

const sendBadRequest = res => {
  res.status(400).end("Game is over (or) not exists");
};

const extractReqDetails = req => {
  const player = req.cookies.name;
  const games = req.app.games;
  const game = games[player];
  const guess = req.body.guess;

  return { player, games, game, guess };
};

const handleValidateGuess = (req, res) => {
  const { player, game, games, guess } = extractReqDetails(req);

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
