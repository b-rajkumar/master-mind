const { describe, it } = require("node:test");
const assert = require("assert");
const MasterMindDB = require("../../src/models/master-mind-db");

describe("masterMindDB", () => {
  it("should add the user to the database", (context, done) => {
    const users = [{ name: "raj", password: "kumar", token: "1" }];
    const expectedUserData = [
      { name: "raj", password: "kumar", token: "1" },
      { name: "bittu", password: "thakur", token: "2" },
    ];
    const playersStats = {};
    const writeFile = context.mock.fn((path, data) => {
      done();
      assert.strictEqual(path, "./data/users.json");
      assert.strictEqual(data, JSON.stringify(expectedUserData));
    });

    const masterMindDB = new MasterMindDB(users, playersStats, writeFile);
    masterMindDB.registerUser("bittu", "thakur");
  });

  it("should give the users", () => {
    const users = [{ name: "raj", password: "kumar", token: "1" }];
    const playersStats = {};
    const masterMindDB = new MasterMindDB(users, playersStats, () => {});
    masterMindDB.registerUser("bittu", "thakur");

    assert.deepStrictEqual(masterMindDB.getUsers(), [
      { name: "raj", password: "kumar", token: "1" },
      { name: "bittu", password: "thakur", token: "2" },
    ]);
  });

  describe("getPlayerStats", () => {
    it("should give the stats of the player", () => {
      const users = ["raj", "krishna"];
      const playersStats = {
        raj: {
          games: [
            {
              secretColorCombination: "RGBYW",
              isGameOver: true,
              hasWon: false,
              numberOfAttempts: 1,
              attemptsLeft: 0,
              guesses: [
                {
                  guessColorCombination: "WRGBW",
                  result: { R: 1, W: 3 },
                },
              ],
            },
          ],
        },
      };

      const expectedStats = {
        games: [
          {
            secretColorCombination: "RGBYW",
            isGameOver: true,
            hasWon: false,
            numberOfAttempts: 1,
            attemptsLeft: 0,
            guesses: [
              {
                guessColorCombination: "WRGBW",
                result: { R: 1, W: 3 },
              },
            ],
          },
        ],
      };
      const masterMindDB = new MasterMindDB(users, playersStats, () => {});

      assert.deepStrictEqual(masterMindDB.getPlayerStats("raj"), expectedStats);
    });
  });

  it("should give the stats of the player", () => {
    const users = ["raj", "krishna"];
    const playersStats = {};
    const expectedStats = {};
    const masterMindDB = new MasterMindDB(users, playersStats, () => {});

    assert.deepStrictEqual(masterMindDB.getPlayerStats("raj"), expectedStats);
  });

  describe("addGameStats", () => {
    it("should add the game stats of the given player", context => {
      const users = ["raj", "krishna"];
      const playersStats = {};
      const writeFile = context.mock.fn();
      const masterMindDB = new MasterMindDB(users, playersStats, writeFile);
      masterMindDB.addGameStats("raj", {
        secretColorCombination: "RGBYW",
        isGameOver: true,
        hasWon: false,
        numberOfAttempts: 1,
        attemptsLeft: 0,
        guesses: [
          {
            guessColorCombination: "WRGBW",
            result: { R: 1, W: 3 },
          },
        ],
      });
      assert.strictEqual(writeFile.mock.callCount(), 1);
    });
  });
});
