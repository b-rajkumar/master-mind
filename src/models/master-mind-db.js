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
    this.#writeFile("../data/users", JSON.stringify(this.#users), () => {});
  }

  getUsers() {
    return [...this.#users];
  }
}

module.exports = MasterMindDB;
