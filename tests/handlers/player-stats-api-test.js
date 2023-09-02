const { describe, it } = require("node:test");
const request = require("supertest");
const { createApp } = require("../../src/app");
const MasterMindDB = require("../../src/models/master-mind-db");

describe("GET /player-stats", () => {
  // eslint-disable-next-line max-len
  it("should give the stats of the player, if the player is already registered", (_, done) => {
    const playerStats = {
      raj: {
        games: [
          {
            secretCombination: "RGBYW",
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

    const masterMindDB = new MasterMindDB(
      [{ name: "raj", password: "kumar", token: "1" }],
      playerStats,
      () => {}
    );
    const app = createApp(masterMindDB);
    const stats = {
      games: [
        {
          secretCombination: "RGBYW",
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

    request(app)
      .get("/player-stats/raj")
      .set("Cookie", ["name=raj; token=1"])
      .expect(200)
      .expect("content-type", "application/json; charset=utf-8")
      .expect(stats)
      .end(done);
  });
});
