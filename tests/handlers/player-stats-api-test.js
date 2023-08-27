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

    const masterMindDB = new MasterMindDB(["raj"], playerStats, () => {});
    const app = createApp(masterMindDB);
    const stats = {
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

    request(app)
      .get("/player-stats")
      .set("Cookie", ["name=raj"])
      .expect(200)
      .expect("content-type", "application/json; charset=utf-8")
      .expect(stats)
      .end(done);
  });
});
