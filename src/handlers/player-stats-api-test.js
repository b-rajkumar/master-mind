const handlePlayerStats = (req, res) => {
  const masterMindDB = req.app.masterMindDB;
  const player = req.cookies.name;
  res.send(masterMindDB.getPlayerStats(player));
};

module.exports = { handlePlayerStats };
