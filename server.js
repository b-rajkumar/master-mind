const { createApp } = require("./src/app");
const { readFile, writeFile } = require("fs");
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

const main = () => {
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
