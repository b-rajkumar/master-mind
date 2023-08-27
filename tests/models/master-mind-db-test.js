const { describe, it } = require("node:test");
const assert = require("assert");
const MasterMindDB = require("../../src/models/master-mind-db");

describe("masterMindDB", () => {
  it("should add the user to the database", (context, done) => {
    const users = ["raj", "krishna"];
    const playersStats = {};
    const writeFile = context.mock.fn((path, data) => {
      done();
      assert.strictEqual(path, "../data/users");
      assert.strictEqual(data, '["raj","krishna","bittu"]');
    });

    const masterMindDB = new MasterMindDB(users, playersStats, writeFile);
    masterMindDB.registerUser("bittu");
  });

  it("should give the users", () => {
    const users = ["raj", "krishna"];
    const playersStats = {};
    const masterMindDB = new MasterMindDB(users, playersStats, () => {});
    masterMindDB.registerUser("bittu");

    assert.deepStrictEqual(masterMindDB.getUsers(), [...users, "bittu"]);
  });
});
