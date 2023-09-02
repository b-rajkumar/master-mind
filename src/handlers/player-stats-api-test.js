const handlePlayerStats = (req, res) => {
  const masterMindDB = req.app.masterMindDB;
  const player = req.params.player;

  res.send(masterMindDB.getPlayerStats(player));
};

module.exports = { handlePlayerStats };
