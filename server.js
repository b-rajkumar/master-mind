const { createApp } = require("./src/app");
const fs = require("fs");
const { readFile, writeFile } = fs;
const MasterMindDB = require("./src/models/master-mind-db");

const setupDataBase = handler => {
  readFile("./data/users.json", (e, usersData) => {
    const users = JSON.parse(usersData);

    readFile("./data/players-stats.json", (e, playersStatsData) => {
      const playersStats = JSON.parse(playersStatsData);
      const masterMindDB = new MasterMindDB(users, playersStats, writeFile);

      handler(masterMindDB);
    });
  });
};

const createMasterMindDataBase = () => {
  const userDetailsFilePath = "./data/users.json";
  const playerStatsFilePath = "./data/players-stats.json";

  if (!fs.existsSync("./data/")) fs.mkdirSync("./data");
  if (!fs.existsSync(userDetailsFilePath))
    fs.writeFileSync(userDetailsFilePath, "[]");

  if (!fs.existsSync(playerStatsFilePath))
    fs.writeFileSync(playerStatsFilePath, "{}");
};

const main = () => {
  createMasterMindDataBase();
  const port = 9090;
  setupDataBase(masterMindDB => {
    const app = createApp(masterMindDB);

    app.listen(port, () => {
      const date = Date();
      // eslint-disable-next-line no-console
      console.log("Listening on", port, date);
    });
  });
};

main();
