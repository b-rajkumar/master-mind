const { describe, it } = require("node:test");
const request = require("supertest");
const { createApp } = require("../../src/app");
const MasterMindDB = require("../../src/models/master-mind-db");
const { handleGameStart } = require("../../src/handlers/game-start-api");
const MasterMind = require("../../src/models/master-mind");

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

  // eslint-disable-next-line max-len
  it("should give the stats of the currently running game, if a game is already started", (_, done) => {
    const masterMindDB = new MasterMindDB(["raj"], {}, () => {});
    const game = new MasterMind("RGBWY");
    game.validateGuess("RGWBE");
    const app = createApp(masterMindDB);
    app.games.raj = game;

    request(app)
      .get("/game/start")
      .set("Cookie", ["name=raj"])
      .expect(200)
      .expect("content-type", "application/json; charset=utf-8")
      .expect({
        isGameOver: false,
        hasWon: false,
        numberOfAttempts: 10,
        attemptsLeft: 9,
        guesses: [
          {
            guess: "RGWBE",
            result: { R: 2, W: 2 },
          },
        ],
      })
      .end(done);
  });
});
