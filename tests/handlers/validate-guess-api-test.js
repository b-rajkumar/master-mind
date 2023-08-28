const { describe, it } = require("node:test");
const request = require("supertest");
const { createApp } = require("../../src/app");
const MasterMindDB = require("../../src/models/master-mind-db");
const MasterMind = require("../../src/models/master-mind");

describe("POST /game/validate-guess", () => {
  // eslint-disable-next-line max-len
  it("should give the result of the guess", (_, done) => {
    const masterMindDB = new MasterMindDB(["raj"], {}, () => {});
    const game = new MasterMind("RGBWY");
    const app = createApp(masterMindDB);
    app.games.raj = game;

    request(app)
      .post("/game/validate-guess")
      .send({ guess: "RGWBO" })
      .set("Cookie", "name=raj")
      .expect(200)
      .expect("content-type", "application/json; charset=utf-8")
      .expect({
        R: 2,
        W: 2,
        attempt: 1,
        isGameOver: false,
        hasWon: false,
      })
      .end(done);
  });

  describe("Invalid request", () => {
    // eslint-disable-next-line max-len
    it("should respond with error if the guess details are not provided", (_, done) => {
      const masterMindDB = new MasterMindDB(["raj"], {}, () => {});
      const game = new MasterMind("RGBWY");
      const app = createApp(masterMindDB);
      app.games.raj = game;

      request(app)
        .post("/game/validate-guess")
        .set("Cookie", "name=raj")
        .expect(400)
        .expect({
          message:
            // eslint-disable-next-line max-len
            "Expected '{guess: colorCombination}' in json format and should only contain colors 'RGBWYOPN' as Request body",
        })
        .end(done);
    });

    // eslint-disable-next-line max-len
    it("should respond with error if the guess colors are not in the given color set", (_, done) => {
      const masterMindDB = new MasterMindDB(["raj"], {}, () => {});
      const game = new MasterMind("RGBWY");
      const app = createApp(masterMindDB);
      app.games.raj = game;

      request(app)
        .post("/game/validate-guess")
        .send({ guess: "ABCDE" })
        .set("Cookie", "name=raj")
        .expect(400)
        .expect({
          message:
            // eslint-disable-next-line max-len
            "Expected '{guess: colorCombination}' in json format and should only contain colors 'RGBWYOPN' as Request body",
        })
        .end(done);
    });
  });

  describe("Bad Request", () => {
    it("should respond with error if the game is not started", (_, done) => {
      const masterMindDB = new MasterMindDB(["raj"], {}, () => {});
      const app = createApp(masterMindDB);

      request(app)
        .post("/game/validate-guess")
        .send({ guess: "RGBYW" })
        .set("Cookie", "name=raj")
        .expect(400)
        .expect({ message: "Game is over (or) not exists" })
        .end(done);
    });
  });
});
