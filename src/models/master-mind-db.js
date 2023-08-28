class MasterMindDB {
  #users;
  #writeFile;
  #updateQueue;
  #isWriting;
  #playersStats;

  constructor(users, playersStats, writeFile) {
    this.#users = [...users];
    this.#playersStats = playersStats;
    this.#writeFile = writeFile;
    this.#updateQueue = [];
    this.#isWriting = false;
  }

  registerUser(name, password) {
    const token = this.#users.length + 1;
    this.#users.push({ name, password, token: token.toString() });
    this.#writeFile("./data/users.json", JSON.stringify(this.#users), () => {});
  }

  #updateDataBase() {
    const updateData = this.#updateQueue.pop();
    this.#isWriting = true;
    this.#writeFile("./data/players-stats.json", updateData, () => {
      if (this.#updateQueue.length === 0) return (this.#isWriting = false);
      this.#updateDataBase();
    });
  }

  #updatePlayerStats() {
    this.#updateQueue.push(JSON.stringify(this.#playersStats));
    if (this.#isWriting) return;

    this.#updateDataBase();
  }

  addGameStats(player, gameStats) {
    const playerStats = this.#playersStats[player] || { games: [] };
    playerStats.games.push(gameStats);
    this.#playersStats[player] = playerStats;

    this.#updatePlayerStats();
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
