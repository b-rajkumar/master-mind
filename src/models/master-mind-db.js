class MasterMindDB {
  #users;
  #writeFile;
  #playersStats;

  constructor(users, playersStats, writeFile) {
    this.#users = [...users];
    this.#playersStats = playersStats;
    this.#writeFile = writeFile;
  }

  registerUser(username) {
    this.#users.push(username);
    this.#writeFile("./data/users.json", JSON.stringify(this.#users), () => {});
  }

  getPlayerStats(player) {
    const playerStats = this.#playersStats[player];
    if (playerStats) return JSON.parse(JSON.stringify(playerStats));

    return {};
  }

  getUsers() {
    return [...this.#users];
  }
}

module.exports = MasterMindDB;
