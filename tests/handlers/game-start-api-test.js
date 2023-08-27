const { describe, it } = require("node:test");
const request = require("supertest");
const { createApp } = require("../../src/app");
const MasterMindDB = require("../../src/models/master-mind-db");

describe("GET /game/start", () => {
  it("should start a game and give the stats of the game", (_, done) => {
    const masterMindDB = new MasterMindDB(["raj"], {}, () => {});
    const app = createApp(masterMindDB);

    request(app)
      .get("/game/start")
      .set("Cookie", ["name=raj"])
      .expect(200)
      .expect("content-type", "application/json; charset=utf-8")
      .expect({
        isGameOver: false,
        hasWon: false,
        numberOfAttempts: 10,
        attemptsLeft: 10,
        guesses: [],
      })
      .end(done);
  });
});
