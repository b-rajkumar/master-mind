const { describe, it } = require("node:test");
const request = require("supertest");
const { createApp } = require("../../src/app");
const MasterMindDB = require("../../src/models/master-mind-db");

describe("GET /game", () => {
  it("should serve the game page", (_, done) => {
    const masterMindDB = new MasterMindDB(["raj"], {}, () => {});
    const app = createApp(masterMindDB);

    request(app)
      .get("/game")
      .set("Cookie", ["name=raj"])
      .expect(200)
      .expect("content-type", "text/html; charset=UTF-8")
      .end(done);
  });
});
